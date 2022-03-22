using GameWeb.Exceptions;
using GameWeb.Models;
using GameWeb.Models.Entities;
using GameWeb.Models.Projections;
using GameWeb.Models.Requests;
using GameWeb.Models.Responses;
using GameWeb.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GameWeb.Services;

public class DeveloperService : IDeveloperService
{
    private readonly GameWebContext _context;
    private readonly ILogger<DeveloperService> _logger;

    public DeveloperService(GameWebContext context, ILogger<DeveloperService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<AddDeveloperResponse> AddDeveloper(AddDeveloperRequest request, CancellationToken cancellationToken)
    {
        Guid newGuid = Guid.NewGuid();
        Developer newDev = new Developer
        {
            Guid = newGuid,
            Name = request.Name,
            EstablishmentYear = request.EstablishmentYear,
            Description = request.Description,
            WebAddress = request.WebAddress,
            Location = request.Location
        };
        await _context.Developers.AddAsync(newDev, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new AddDeveloperResponse
        {
            Id = newGuid
        };
    }

    public async Task<DeveloperResponse> GetDeveloper(Guid id, CancellationToken cancellationToken)
    {
        DeveloperResponse? dev = await _context.Developers
            .Where(x => x.Guid == id)
            .Include(x => x.Games)
                .ThenInclude(g => g.Ratings)
            .Include(x => x.Games)
                .ThenInclude(g => g.GameGenres)
            .Select(x => new DeveloperResponse
            {
                Id = x.Guid,
                Name = x.Name,
                Description = x.Description,
                EstablishmentYear = x.EstablishmentYear,
                WebAddress = x.WebAddress,
                Location = x.Location,
                Games = x.Games.Select(g => new GameListProjection
                {
                    Id = g.Guid,
                    Name = g.Name,
                    AverageRating = Convert.ToInt64(g.Ratings.Select(r => r.Value).Average()),
                    Genres = g.GameGenres.Select(y => y.Genre.Name).ToList(),
                }).ToList()
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (dev == null)
        {
            throw new EntityNotFoundException();
        }
        return dev;
    }

    public async Task<DevelopersListResponse> GetDevelopers(int? page, int? limit, CancellationToken cancellationToken)
    {
        List<DeveloperProjection> developers;

        if (page != null && limit != null && limit != 0)
        {
            developers = await _context.Developers
                .Skip((page.Value - 1) * limit.Value)
                .Take(limit.Value)
                .Select(x => new DeveloperProjection
                {
                    Id = x.Guid,
                    Name = x.Name,
                    Description = x.Description,
                    EstablishmentYear = x.EstablishmentYear,
                    WebAddress = x.WebAddress,
                    Location = x.Location,
                })
                .ToListAsync(cancellationToken);
        }
        else
        {
            developers = await _context.Developers
                .Select(x => new DeveloperProjection
                {
                    Id = x.Guid,
                    Name = x.Name,
                    Description = x.Description,
                    EstablishmentYear = x.EstablishmentYear,
                    WebAddress = x.WebAddress
                })
                .ToListAsync(cancellationToken);
        }

        return new DevelopersListResponse(developers);
    }

    public async Task RemoveDeveloper(Guid id, CancellationToken cancellationToken)
    {
        var dev = await _context.Developers
            .FirstOrDefaultAsync(x => x.Guid == id, cancellationToken);

        if (dev == null)
        {
            throw new EntityNotFoundException();
        }

        _context.Developers.Remove(dev);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<AddDeveloperResponse> UpdateDeveloper(Guid id, UpdateDeveloperRequest request, CancellationToken cancellationToken)
    {
        var dev = await _context.Developers
            .FirstOrDefaultAsync(x => x.Guid == id, cancellationToken);

        if (dev == null)
        {
            throw new EntityNotFoundException();
        }

        dev.Description = request.Description ?? dev.Description;
        dev.Name = request.Name ?? dev.Name;
        dev.Description = request.Description ?? dev.Description;
        dev.EstablishmentYear = request.EstablishmentYear ?? dev.EstablishmentYear;
        dev.WebAddress = request.WebAddress ?? dev.WebAddress;
        dev.Location = request.Location ?? dev.Location;

        await _context.SaveChangesAsync(cancellationToken);

        return new AddDeveloperResponse
        {
            Id = dev.Guid
        };   
    }
}
