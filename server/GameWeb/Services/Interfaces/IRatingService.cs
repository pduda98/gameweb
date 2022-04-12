using GameWeb.Models.Requests;
using GameWeb.Models.Entities;

namespace GameWeb.Services.Interfaces;

public interface IRatingService
{
    Task AddRating(Guid gameId, User user, AddUpdateRatingRequest request, CancellationToken cancellationToken);
    Task UpdateRating(long id, User user, Guid gameId, AddUpdateRatingRequest request, CancellationToken cancellationToken);
    Task RemoveRating(long id, User user, Guid gameId, CancellationToken cancellationToken);
}