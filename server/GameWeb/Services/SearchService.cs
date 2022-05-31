using GameWeb.Models;
using GameWeb.Models.Projections;
using GameWeb.Models.Responses;
using GameWeb.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GameWeb.Services;

public class SearchService : ISearchService
{
    private readonly GameWebContext _context;
    private readonly ILogger<ReviewService> _logger;

    public SearchService(GameWebContext context, ILogger<ReviewService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<SearchResponse> Search(string searchString, CancellationToken cancellationToken)
    {
        return new SearchResponse(
            await SearchGames(searchString, cancellationToken),
            await SearchDevelopers(searchString, cancellationToken)
        );
    }

    private async Task<List<SearchGameProjection>> SearchGames(string searchString, CancellationToken cancellationToken)
    {
        return await _context.Games
            .Where(x => x.Name.Contains(searchString))
            .Select(x => new SearchGameProjection
                {
                    Id = x.Guid,
                    Name = x.Name,
                    ReleaseYear = x.ReleaseDate.Year
                })
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }

    private async Task<List<SearchDeveloperProjection>> SearchDevelopers(string searchString, CancellationToken cancellationToken)
    {
        return await _context.Developers
            .Where(x => x.Name.Contains(searchString))
            .Select(x => new SearchDeveloperProjection
                {
                    Id = x.Guid,
                    Name = x.Name
                })
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }
}