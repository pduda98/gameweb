using GameWeb.Models.Requests;
using GameWeb.Models.Responses;

namespace GameWeb.Services.Interfaces;

public interface IGenreService
{
    Task<AddUpdateGenreResponse> AddGenre(AddUpdateGenreRequest request, CancellationToken cancellationToken);
    Task<AddUpdateGenreResponse> UpdateGenre(Guid id, AddUpdateGenreRequest request, CancellationToken cancellationToken);
    Task RemoveGenre(Guid id, CancellationToken cancellationToken);
    Task<GenresListResponse> GetGenres(int? page, int? limit, CancellationToken cancellationToken);
}