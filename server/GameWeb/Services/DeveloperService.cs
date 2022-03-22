using GameWeb.Models;
using GameWeb.Models.Requests;
using GameWeb.Models.Responses;
using GameWeb.Services.Interfaces;

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

    public Task<AddDeveloperResponse> AddDeveloper(AddDeveloperRequest request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<DeveloperResponse> GetDeveloper(Guid id, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<DevelopersListResponse> GetDevelopers(int? page, int? limit, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task RemoveDeveloper(Guid id, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<AddDeveloperResponse> UpdateDeveloper(Guid id, UpdateDeveloperRequest request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}