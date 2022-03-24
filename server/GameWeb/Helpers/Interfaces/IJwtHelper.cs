using GameWeb.Models.Entities;

namespace GameWeb.Helpers.Interfaces;

public interface IJwtHelper
{
    long? ValidateJwtToken(string? token);
    string GenerateJwtToken(User user);
    RefreshToken GenerateRefreshToken(long userId);
}
