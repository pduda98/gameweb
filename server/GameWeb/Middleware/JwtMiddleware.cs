using GameWeb.Helpers;
using GameWeb.Helpers.Interfaces;
using GameWeb.Services.Interfaces;

namespace GameWeb.Middleware;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, IUserService userService, IJwtHelper jwtHelper)
    {
        var token = context.Request.Headers[Consts.AuthorizationHeaderName].FirstOrDefault()?.Split(" ").Last();
        var userId = jwtHelper.ValidateJwtToken(token);
        if (userId != null)
        {
            context.Items[Consts.ContextItemUserInfoName] = userService.GetUserById(userId.Value);
        }

        await _next(context);
    }
}
