using GameWeb.Models.Requests;
using GameWeb.Models.Responses;

namespace GameWeb.Services.Interfaces;

public interface IGameService
{
    Task<AddUpdateGameResponse> AddGame(AddGameRequest request, CancellationToken cancellationToken);
    Task<AddUpdateGameResponse> UpdateGame(Guid id, UpdateGameRequest request, CancellationToken cancellationToken);
}