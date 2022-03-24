using GameWeb.Models.Entities;

namespace GameWeb.Helpers.Interfaces;

public interface IUserHelper
{
    int? GetUsersGameRating(Game game, long? userId);
    User GetUserFromHttpContext(HttpContext context);
}