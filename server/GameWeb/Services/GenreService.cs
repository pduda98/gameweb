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

    public async Task<AddUpdateGenreResponse> AddGenre(AddUpdateGenreRequest request, CancellationToken cancellationToken)
    {
        if(string.IsNullOrEmpty(request.Name) || string.IsNullOrWhiteSpace(request.Name))
        {
            throw new BadRequestException();
        }

        Genre genre = new Genre()
        {
            Name = request.Name,
            Guid = Guid.NewGuid()
        };
        var result = await _context.AddAsync<Genre>(genre, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return new AddUpdateGenreResponse(result.Entity);
    }

    public async Task<AddUpdateGenreResponse> UpdateGenre(Guid id, AddUpdateGenreRequest request, CancellationToken cancellationToken)
    {
        if(string.IsNullOrEmpty(request.Name) || string.IsNullOrWhiteSpace(request.Name))
        {
            throw new BadRequestException();
        }

        Genre? genre = await _context.Genres.FirstOrDefaultAsync(a => a.Guid == id, cancellationToken);
        if (genre == null)
        {
            throw new EntityNotFoundException();
        }
        genre.Name = request.Name ?? genre.Name;
        var result = _context.Genres.Update(genre);
        await _context.SaveChangesAsync(cancellationToken);
        return new AddUpdateGenreResponse(result.Entity);
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
        List<string> genres;

        if (page != null && limit != null && limit != 0)
        {
            genres = await _context.Genres
                .Skip((page.Value - 1) * limit.Value)
                .Take(limit.Value)
                .Select(a => a.Name)
                .ToListAsync(cancellationToken);
        }
        else
        {
            genres = await _context.Genres
                .Select(a => a.Name)
                .ToListAsync(cancellationToken);
        }
        return new GenresListResponse(genres);
    }
}
