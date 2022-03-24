using System.Security.Authentication;
using GameWeb.Helpers.Interfaces;
using GameWeb.Models.Entities;

namespace GameWeb.Helpers;

public class UserHelper : IUserHelper
{
    public User GetUserFromHttpContext(HttpContext context)
    {
        return (User)(context.Items[Consts.ContextItemUserInfoName] ?? throw new AuthenticationException());
    }
    
    public int? GetUsersGameRating(Game game, long? userId)
    {
        if (userId == null) return null;

        if (game.Ratings.Any(r => r.UserId == userId))
        {
            return game.Ratings.First(r => r.UserId == userId).Value;
        }

        return null;
    }
}
