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
    private readonly ILogger<GenreService> _logger;

    public GameService(GameWebContext context, IUserHelper userHelper, ILogger<GenreService> logger)
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

        if(dev == null)
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

            if(genreId == null)
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
        if(request.DeveloperId != null)
        {
            long? devId = await _context.Developers
                .Where(x => x.Guid == request.DeveloperId)
                .Select(x => x.Id)
                .FirstOrDefaultAsync(cancellationToken);

            game.DeveloperId = devId ?? game.DeveloperId;
        }

        //GameGenres update
        if(request.Genres != null)
        {
            //Co jeśli poda nazwę gatunku, który nie istnieje?
            var updatedGenres = await _context.Genres
                .Where(x => request.Genres.Any(y => y == x.Name))
                .ToListAsync(cancellationToken);

            var toRemove = game.GameGenres.Where(x => !updatedGenres.Any(y => y.Id == x.GenreId)).ToList();
            var toAdd = updatedGenres.Where(x => !game.GameGenres.Any(y => y.GenreId == x.Id))
                .Select(x => new GameGenre
                {
                    GenreId = x.Id
                }).ToList();

            foreach(var val in toRemove)
            {
                _context.GameGenres.Remove(val);
                game.GameGenres.Remove(val);
            }

            foreach(var val in toAdd)
            {
                game.GameGenres.Add(val);
            }
        }

        var dev = await _context.Developers
            .Where(x => x.Id == game.DeveloperId)
            .FirstOrDefaultAsync(cancellationToken);

        if(dev == null)
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
            Genres = request.Genres,
            Developer = new GameDeveloperProjection
            {
                Id = dev.Guid,
                Name = dev.Name
            }
        };
    }
}
