using GameWeb.Exceptions;
using GameWeb.Helpers;
using GameWeb.Helpers.Interfaces;
using GameWeb.Models;
using GameWeb.Models.Entities;
using GameWeb.Models.Projections;
using GameWeb.Models.Requests;
using GameWeb.Models.Responses;
using GameWeb.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GameWeb.Services;

public class ReviewService : IReviewService
{
    private readonly GameWebContext _context;
    private readonly IUserHelper _userHelper;
    private readonly ILogger<ReviewService> _logger;

    public ReviewService(GameWebContext context, IUserHelper userHelper, ILogger<ReviewService> logger)
    {
        _context = context;
        _userHelper = userHelper;
        _logger = logger;
    }

    public async Task<AddUpdateReviewResponse> AddReview(
        AddReviewRequest request,
        User user,
        Guid gameId,
        CancellationToken cancellationToken)
    {
        Game? game = await _context.Games.FirstOrDefaultAsync(x => x.Guid == gameId, cancellationToken);
        if (game == null)
            throw new EntityNotFoundException();

        if (await _context.Reviews.AnyAsync(x => x.GameId == game.Id && x.UserId == user.Id, cancellationToken))
            throw new BadRequestException();

        await AddOrUpdateRating(game, user, request.Rating, cancellationToken);
    
        var guidId = Guid.NewGuid();

        var review = new Review
        {
            Title = request.Title,
            CreationTime = DateTime.UtcNow,
            LastUpdateTime = DateTime.UtcNow,
            ReviewContent = request.Content,
            User = user,
            Game = game,
            Guid = guidId
        };

        await _context.Reviews.AddAsync(review, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        
        return new AddUpdateReviewResponse
        {
            GameId = game.Guid,
            ReviewId = guidId
        };
    }

    public async Task<ReviewResponse> GetReview(Guid gameId, Guid reviewId, long? userId, CancellationToken cancellationToken)
    {
        ReviewResponse? review = await _context.Reviews
            .Where(x => x.Guid == reviewId)
            .Include(x => x.Game)
            .Include(x => x.User)
                .ThenInclude(x => x.Ratings)
            .Select(x => new ReviewResponse
            {
                Title = x.Title,
                Content = x.ReviewContent,
                CreationTime = x.CreationTime,
                Game = new SimpleGameProjection
                {
                    Name = x.Game.Name,
                    Id = x.Game.Guid
                },
                UserName = x.User.Name,
                Rating = x.User.Ratings.Any(y => y.GameId == x.Game.Id) 
                    ? x.User.Ratings.First(y => y.GameId == x.Game.Id).Value : null
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (review == null || review.Game.Id != gameId)
            throw new EntityNotFoundException();

        return review;
    }

    public async Task<ReviewsListResponse> GetGameReviews(Guid gameId, int? page, int? limit, CancellationToken cancellationToken)
    {
        if (!await _context.Games.AnyAsync(x => x.Guid == gameId, cancellationToken))
            throw new EntityNotFoundException();

        List<ReviewListProjection> reviews;

        if (page != null && limit != null && limit != 0)
        {
            reviews = await _context.Reviews
                .OrderByDescending(x => x.CreationTime)
                .Skip((page.Value - 1) * limit.Value)
                .Take(limit.Value)
                .Include(x => x.Game)
                .Include(x => x.User)
                    .ThenInclude(x => x.Ratings)
                .Select(x => new ReviewListProjection
                {
                    Title = x.Title,
                    CreationTime = x.CreationTime,
                    UserName = x.User.Name,
                    Rating = x.User.Ratings.Any(y => y.GameId == x.Game.Id) 
                        ? x.User.Ratings.First(y => y.GameId == x.Game.Id).Value : null
                })
                .ToListAsync(cancellationToken);
        }
        else
        {
            reviews = await _context.Reviews
                .OrderByDescending(x => x.CreationTime)
                .Include(x => x.Game)
                .Include(x => x.User)
                    .ThenInclude(x => x.Ratings)
                .Select(x => new ReviewListProjection
                {
                    Title = x.Title,
                    CreationTime = x.CreationTime,
                    UserName = x.User.Name,
                    Rating = x.User.Ratings.Any(y => y.GameId == x.Game.Id) 
                        ? x.User.Ratings.First(y => y.GameId == x.Game.Id).Value : null
                })
                .ToListAsync(cancellationToken);
        }

        return new ReviewsListResponse(reviews);
    }

    public async Task RemoveReview(Guid gameId, Guid reviewId, User user, CancellationToken cancellationToken)
    {
        var review = await _context.Reviews
            .Include(x => x.Game)
            .FirstOrDefaultAsync(x => x.Guid == reviewId, cancellationToken);

        if (review == null || review.Game.Guid != gameId)
            throw new EntityNotFoundException();

        if (user.Role.Name != Consts.UserAdminRoleName && review.UserId != user.Id)
            throw new NotAuthorizedException();

        _context.Reviews.Remove(review);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<AddUpdateReviewResponse> UpdateReview(
        Guid gameId,
        Guid reviewId, 
        UpdateReviewRequest request,
        User user,
        CancellationToken cancellationToken)
    {
        var review = await _context.Reviews
            .Include(x => x.Game)
            .FirstOrDefaultAsync(x => x.Guid == reviewId, cancellationToken);

        if (review == null || review.Game.Guid != gameId)
            throw new EntityNotFoundException();

        if (user.Role.Name != Consts.UserAdminRoleName && review.UserId != user.Id)
            throw new NotAuthorizedException();

        await AddOrUpdateRating(review.Game, user, request.Rating, cancellationToken);

        review.Title = request.Title ?? review.Title;
        review.ReviewContent = request.Content ?? review.ReviewContent;
        review.LastUpdateTime = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new AddUpdateReviewResponse
        {
            GameId = gameId,
            ReviewId = reviewId
        }; 
    }

    public async Task<LastReviewsListResponse> GetLastReviews(int? limit, CancellationToken cancellationToken)
    {
        if (limit == null || limit == 0)
        {
            limit = Configuration.DefaultNumberOfLastReviews ?? throw new ArgumentException();
        }
        List<LastReviewsListProjection> reviews = await _context.Reviews
            .OrderByDescending(x => x.CreationTime)
            .Take(limit.Value)
            .Include(x => x.Game)
                .ThenInclude(x => x.Ratings.Where(y => y.GameId == x.Id))
            .Include(x => x.Game)
                .ThenInclude(x => x.Developer)
            .Include(x => x.Game)
                .ThenInclude(x => x.GameGenres)
            .Include(x => x.User)
                .ThenInclude(x => x.Ratings)
            .Select(x => new LastReviewsListProjection
            {
                Content = x.ReviewContent,
                Id = x.Guid,
                Title = x.Title,
                CreationTime = x.CreationTime,
                UserName = x.User.Name,
                Rating = x.User.Ratings.Any(y => y.GameId == x.Game.Id)
                    ? x.User.Ratings.First(y => y.GameId == x.Game.Id).Value : null,
                Game = new LastReviewListGameProjection
                {
                    Id = x.Game.Guid,
                    Name = x.Game.Name,
                    ReleaseYear = x.Game.ReleaseDate.Year,
                    AverageRating = Convert.ToInt64(x.Game.Ratings.Select(r => r.Value).Average()),
                    Developer = new GameDeveloperProjection
                    {
                        Id = x.Game.Developer.Guid,
                        Name = x.Game.Developer.Name
                    },
                    Genres = x.Game.GameGenres.Select(y => y.Genre.Name).ToList(),
                    RatingsCount = x.Game.Ratings.Count
                }
            })
            .ToListAsync(cancellationToken);
        return new LastReviewsListResponse(reviews);
    }

    private async Task AddOrUpdateRating(Game game, User user, int? rating, CancellationToken cancellationToken)
    {
        Rating? usersRating = await _context.Ratings.FirstOrDefaultAsync(
            x => x.GameId == game.Id && x.UserId == user.Id,
            cancellationToken);

        if (rating != null)
        {
            if (usersRating != null)
            {
                usersRating.Value = rating.Value;
                _context.Update(usersRating);
                await _context.SaveChangesAsync(cancellationToken);
            }
            else
            {
                usersRating = new Rating
                {
                    Game = game,
                    User = user,
                    Value = rating.Value
                };
                await _context.Ratings.AddAsync(usersRating, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
