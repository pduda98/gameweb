using GameWeb.Models.Entities;

namespace GameWeb.Helpers.Interfaces;

public interface IJwtHelper
{
    long? ValidateJwtToken(string? token);
    string GenerateJwtToken(User user, DateTime expirationTime);
    RefreshToken GenerateRefreshToken(long userId);
}
