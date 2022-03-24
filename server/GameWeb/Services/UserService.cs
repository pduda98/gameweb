using GameWeb.Models;
using GameWeb.Models.Entities;
using GameWeb.Models.Requests;
using GameWeb.Models.Responses;
using GameWeb.Services.Interfaces;

namespace GameWeb.Services;

public class UserService : IUserService
{
    private readonly GameWebContext _context;
    private readonly ILogger<UserService> _logger;

    public UserService(GameWebContext context, ILogger<UserService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public Task<SignUpResponse> AddUser(SignUpRequest request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task ChangeUsersPassword(long userId, ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task DeactivateAccount(long userId, DeactivateAccountRequest request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public User GetUserById(long userId)
    {
        throw new NotImplementedException();
    }

    public Task<SignInResponse> RefreshToken(string? token, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<SignInResponse> Authenticate(SignInRequest request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
