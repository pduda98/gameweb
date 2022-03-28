using GameWeb.Helpers.Interfaces;
using GameWeb.Models;
using GameWeb.Models.Entities;
using GameWeb.Models.Requests;
using GameWeb.Models.Responses;
using GameWeb.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GameWeb.Services;

public class UserService : IUserService
{
    private readonly GameWebContext _context;
    private readonly ILogger<UserService> _logger;
    private readonly IJwtHelper _jwtHelper;

    public UserService(GameWebContext context, IJwtHelper jwtHelper, ILogger<UserService> logger)
    {
        _context = context;
        _jwtHelper = jwtHelper;
        _logger = logger;
    }

    public async Task<SignUpResponse> AddUser(SignUpRequest request, CancellationToken cancellationToken)
    {
        if (await _context.Users.AnyAsync(x => x.Name == request.UserName || x.Email == request.Email))
            throw new Exception();

        var role = await _context.UserRoles.FirstAsync(x => x.Name == "user");
        var guidId = Guid.NewGuid();

        var user = new User
        {
            Name = request.UserName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = role,
            Guid = guidId
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return new SignUpResponse
        {
            Guid = guidId
        };
    }

    public async Task ChangeUsersPassword(long userId, ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await GetUserById(userId);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.OldPassword, user.PasswordHash))
            throw new Exception();

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
        _context.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeactivateAccount(long userId, DeactivateAccountRequest request, CancellationToken cancellationToken)
    {
        var user = await GetUserById(userId);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new Exception();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<User?> GetUserById(long userId)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
    }

    public Task<SignInResponse> RefreshToken(string? token, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task<SignInResponse> Authenticate(SignInRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Name == request.UserName);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new Exception();

        var jwtToken = _jwtHelper.GenerateJwtToken(user);
        var refreshToken = _jwtHelper.GenerateRefreshToken(user.Id);
        user.RefreshTokens.Add(refreshToken);

        RemoveOldRefreshTokens(user);

        _context.Update(user);
        await _context.SaveChangesAsync();

        var response = new SignInResponse
        {
            Token = jwtToken,
            RefreshToken = refreshToken.Token
        };

        return response;
    }

    private async Task RemoveOldRefreshTokens(User user)
    {
        //throw new NotImplementedException();
    }
}
