using GameWeb.Models;
using GameWeb.Models.Requests;
using GameWeb.Models.Entities;
using GameWeb.Exceptions;
using GameWeb.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GameWeb.Services;

public class RatingService : IRatingService
{
    private readonly GameWebContext _context;
    private readonly ILogger<RatingService> _logger;

    public RatingService(GameWebContext context, ILogger<RatingService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task AddRating(Guid gameId, User user, AddUpdateRatingRequest request, CancellationToken cancellationToken)
    {
        Game? game = await _context.Games.Where(x => x.Guid == gameId).FirstOrDefaultAsync(cancellationToken);

        if (game == null)
        {
            throw new EntityNotFoundException();
        }

        if (await _context.Ratings.AnyAsync(x => x.GameId == game.Id && x.UserId == user.Id, cancellationToken)
            || request.Value < 0 || request.Value > 10)
        {
            throw new BadRequestException();

        }

        Rating rating = new Rating()
        {
            Game = game,
            User = user,
            Value = request.Value
        };

        await _context.AddAsync<Rating>(rating, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateRating(long id, User user, Guid gameId, AddUpdateRatingRequest request, CancellationToken cancellationToken)
    {
        Rating? rating = await _context.Ratings.Include(x => x.Game)
            .Where(x => x.Id == id).FirstOrDefaultAsync(cancellationToken);

        if (rating == null ||  rating.Game.Guid != gameId)
        {
            throw new EntityNotFoundException();
        }

        if (request.Value < 0 || request.Value > 10)
        {
            throw new BadRequestException();
        }

        rating.Value = request.Value;

        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveRating(long id, User user, Guid gameId, CancellationToken cancellationToken)
    {
        Rating? rating = await _context.Ratings.Include(x => x.Game)
            .Where(x => x.Id == id).FirstOrDefaultAsync(cancellationToken);

        if (rating == null ||  rating.Game.Guid != gameId)
        {
            throw new EntityNotFoundException();
        }

        _context.Ratings.Remove(rating);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
