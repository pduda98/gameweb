using GameWeb.Models;
using GameWeb.Models.Requests;
using GameWeb.Models.Responses;
using GameWeb.Models.Entities;
using GameWeb.Exceptions;
using GameWeb.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GameWeb.Services;

public class GenreService : IGenreService
{
    private readonly GameWebContext _context;
    private readonly ILogger<GenreService> _logger;

    public GenreService(GameWebContext context, ILogger<GenreService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Add_UpdateGenreResponse> AddGenre(Add_UpdateGenreRequest request, CancellationToken cancellationToken)
    {
        Genre genre = new Genre()
        {
            Name = request.Name,
            Guid = Guid.NewGuid()
        };
        var result = _context.AddAsync<Genre>(genre, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return new Add_UpdateGenreResponse(result.Result.Entity);
    }
    public async Task<Add_UpdateGenreResponse> UpdateGenre(Guid id, Add_UpdateGenreRequest request, CancellationToken cancellationToken)
    {
        Genre? genre = await _context.Genres.FirstOrDefaultAsync(a => a.Guid == id, cancellationToken);
        if (genre == null)
        {
            throw new EntityNotFoundException();
        }
        genre.Name = request.Name ?? genre.Name;
        var result = _context.Genres.Update(genre);
        await _context.SaveChangesAsync(cancellationToken);
        return new Add_UpdateGenreResponse(result.Entity);
    }
    public async Task RemoveGenre(Guid id, CancellationToken cancellationToken)
    {
        Genre? genre = await _context.Genres.FirstOrDefaultAsync(a => a.Guid == id, cancellationToken);
        if (genre == null)
        {
            throw new EntityNotFoundException();
        }
        var result = _context.Genres.Remove(genre);
        await _context.SaveChangesAsync(cancellationToken);
    }
    public async Task<GenresListResponse> GetGenres(int? page, int? limit, CancellationToken cancellationToken)
    {
        return new GenresListResponse()
        {
            Genres = await _context.Genres
                .OrderBy(a => a.Name)
                .Select(a => a.Name)
                .Skip(page * limit ?? default(int))
                .Take(limit ?? default(int))
                .ToListAsync(cancellationToken)
        };
    }
}