using GameWeb.Models.Entities;
using GameWeb.Models.Requests;
using GameWeb.Models.Responses;

namespace GameWeb.Services.Interfaces;

public interface IUserService
{
    Task<SignUpResponse> AddUser(SignUpRequest request, CancellationToken cancellationToken);
    Task<SignInResponse> Authenticate(SignInRequest request, CancellationToken cancellationToken);
    Task<SignInResponse> RefreshToken(string? token, CancellationToken cancellationToken);
    Task ChangeUsersPassword(long userId, ChangePasswordRequest request, CancellationToken cancellationToken);
    Task DeactivateAccount(long userId, DeactivateAccountRequest request, CancellationToken cancellationToken);
    User GetUserById(long userId);
}