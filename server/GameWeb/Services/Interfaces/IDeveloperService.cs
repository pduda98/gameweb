using GameWeb.Models.Requests;
using GameWeb.Models.Responses;

namespace GameWeb.Services.Interfaces;

public interface IDeveloperService
{
    Task<AddDeveloperResponse> AddDeveloper(AddDeveloperRequest request, CancellationToken cancellationToken);
    Task<AddDeveloperResponse> UpdateDeveloper(Guid id, UpdateDeveloperRequest request, CancellationToken cancellationToken);
    Task RemoveDeveloper(Guid id, CancellationToken cancellationToken);
    Task<DeveloperResponse> GetDeveloper(Guid id, long? userId, CancellationToken cancellationToken);
    Task<DevelopersListResponse> GetDevelopers(int? page, int? limit, CancellationToken cancellationToken);
}
