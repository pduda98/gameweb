using GameWeb.Models.Requests;
using GameWeb.Models.Responses;

namespace GameWeb.Services.Interfaces;

public interface IGenreService
{
    Task<Add_UpdateGenreResponse> AddGenre(Add_UpdateGenreRequest request, CancellationToken cancellationToken);
    Task<Add_UpdateGenreResponse> UpdateGenre(Guid id, Add_UpdateGenreRequest request, CancellationToken cancellationToken);
    Task RemoveGenre(Guid id, CancellationToken cancellationToken);
    Task<GenresListResponse> GetGenres(int? page, int? limit, CancellationToken cancellationToken);
}