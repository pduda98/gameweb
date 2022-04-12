using GameWeb.Models;
using GameWeb.Models.Requests;
using GameWeb.Models.Responses;
using GameWeb.Models.Entities;
using GameWeb.Models.Projections;
using GameWeb.Exceptions;
using GameWeb.Helpers.Interfaces;
using GameWeb.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace GameWeb.Services;

public class GameService : IGameService
{
    private readonly GameWebContext _context;
    private readonly IUserHelper _userHelper;
    private readonly ILogger<GameService> _logger;

    public GameService(GameWebContext context, IUserHelper userHelper, ILogger<GameService> logger)
    {
        _context = context;
        _userHelper = userHelper;
        _logger = logger;
    }

    public async Task<AddUpdateGameResponse> AddGame(AddGameRequest request, CancellationToken cancellationToken)
    {
        var dev = await _context.Developers
            .Where(x => x.Guid == request.DeveloperId)
            .FirstOrDefaultAsync(cancellationToken);

        if (dev == null)
        {
            throw new EntityNotFoundException();
        }

        Game game = new Game()
        {
            Guid = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            ReleaseDate = request.ReleaseDate,
            DeveloperId = dev.Id
        };

        foreach (var val in request.Genres)
        {
            long? genreId = await _context.Genres
                .Where(x => x.Name == val)
                .Select(x => x.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (genreId == null)
            {
                throw new EntityNotFoundException();
            }

            game.GameGenres.Add(new GameGenre(){
                GenreId = (long)genreId
            });
        }

        await _context.AddAsync<Game>(game, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return new AddUpdateGameResponse
        {
            Id = game.Guid,
            Name = game.Name,
            Description = game.Description,
            ReleaseDate = game.ReleaseDate,
            Genres = request.Genres,
            Developer = new GameDeveloperProjection
            {
                Id = request.DeveloperId,
                Name = dev.Name
            }
        };
    }

    public async Task<AddUpdateGameResponse> UpdateGame(Guid id, UpdateGameRequest request, CancellationToken cancellationToken)
    {
        var game = await _context.Games
            .Include(x => x.GameGenres)
            .FirstOrDefaultAsync(x => x.Guid == id, cancellationToken);

        if (game == null)
        {
            throw new EntityNotFoundException();
        }

        //DeveloperId update
        Developer? dev;
        if (request.DeveloperId != null)
        {
            dev = await _context.Developers
                .Where(x => x.Guid == request.DeveloperId)
                .FirstOrDefaultAsync(cancellationToken);

            if (dev == null)
            {
                throw new EntityNotFoundException();
            }
            game.DeveloperId = dev.Id ?? game.DeveloperId;
        }
        else
        {
            dev = await _context.Developers
                .Where(x => x.Id == game.DeveloperId)
                .FirstOrDefaultAsync(cancellationToken);
        }

        //GameGenres update
        if (request.Genres != null)
        {
            var updatedGenres = await _context.Genres
                .Where(x => request.Genres.Any(y => y == x.Name))
                .ToListAsync(cancellationToken);

            if (updatedGenres.Count != request.Genres.Count)
            {
                throw new EntityNotFoundException();
            }

            var toRemove = game.GameGenres.Where(x => !updatedGenres.Any(y => y.Id == x.GenreId)).ToList();
            var toAdd = updatedGenres.Where(x => !game.GameGenres.Any(y => y.GenreId == x.Id))
                .Select(x => new GameGenre
                {
                    GenreId = x.Id
                }).ToList();

            foreach (var val in toRemove)
            {
                _context.GameGenres.Remove(val);
                game.GameGenres.Remove(val);
            }

            foreach (var val in toAdd)
            {
                game.GameGenres.Add(val);
            }
        }
        if (dev == null)
        {
            throw new EntityNotFoundException();
        }
        game.Name = request.Name ?? game.Name;
        game.Description = request.Description ?? game.Description;
        game.ReleaseDate = request.ReleaseDate ?? game.ReleaseDate;
        await _context.SaveChangesAsync(cancellationToken);

        return new AddUpdateGameResponse
        {
            Id = game.Guid,
            Name = game.Name,
            Description = game.Description,
            ReleaseDate = game.ReleaseDate,
            Genres = request.Genres,
            Developer = new GameDeveloperProjection
            {
                Id = dev.Guid,
                Name = dev.Name
            }
        };
    }

    public async Task RemoveGame(Guid id, CancellationToken cancellationToken)
    {
        Game? game = await _context.Games.FirstOrDefaultAsync(a => a.Guid == id, cancellationToken);
        if (game == null)
        {
            throw new EntityNotFoundException();
        }
        var result = _context.Games.Remove(game);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<GameResponse> GetGame(Guid id, long? userId, CancellationToken cancellationToken)
    {
        GameResponse? game = await _context.Games
            .Where(x => x.Guid == id)
            .Include(x => x.Ratings.Where(y => y.GameId == x.Id))
            .Include(x => x.Developer)
            .Include(x => x.GameGenres)
            .Select(x => new GameResponse
            {
                Id = x.Guid,
                Name = x.Name,
                Description = x.Description,
                ReleaseDate = x.ReleaseDate,
                AverageRating = Convert.ToInt64(x.Ratings.Select(r => r.Value).Average()),
                //UsersRating = _userHelper.GetUsersGameRating(x, userId),
                Developer = new GameDeveloperProjection
                {
                    Id = x.Developer.Guid,
                    Name = x.Developer.Name
                },
                Genres = x.GameGenres.Select(y => y.Genre.Name).ToList()
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (game == null)
        {
            throw new EntityNotFoundException();
        }
        return game;
    }

}
