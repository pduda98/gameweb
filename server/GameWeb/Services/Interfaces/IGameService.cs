using GameWeb.Models.Requests;
using GameWeb.Models.Responses;

namespace GameWeb.Services.Interfaces;

public interface IGameService
{
    Task<AddUpdateGameResponse> AddGame(AddGameRequest request, CancellationToken cancellationToken);
    Task<AddUpdateGameResponse> UpdateGame(Guid id, UpdateGameRequest request, CancellationToken cancellationToken);
    Task RemoveGame(Guid id, CancellationToken cancellationToken);
    Task<GameResponse> GetGame(Guid id, long? userId, CancellationToken cancellationToken);
}