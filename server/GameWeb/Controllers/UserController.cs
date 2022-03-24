namespace WebApi.Controllers;

using System.Security.Authentication;
using GameWeb.Exceptions;
using GameWeb.Helpers;
using GameWeb.Helpers.Interfaces;
using GameWeb.Models.Requests;
using GameWeb.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/v1/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IUserHelper _userHelper;
    private readonly ILogger<UserController> _logger;

    public UserController(
        IUserService userService,
        IUserHelper userHelper,
        ILogger<UserController> logger)
    {
        _userService = userService;
        _userHelper = userHelper;
        _logger = logger;
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate(SignInRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var response = await _userService.Authenticate(request, cancellationToken);
            SetTokenCookie(response.RefreshToken);
            return Ok(response);
        }
        catch (AuthenticationException)
        {
            return Forbid();
        }

    }

    [AllowAnonymous]
    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken(CancellationToken cancellationToken)
    {
        try
        {
            var refreshToken = Request.Cookies[Consts.RefreshTokenCookieName];
            var response = await _userService.RefreshToken(refreshToken, cancellationToken);
            SetTokenCookie(response.RefreshToken);
            return Ok(response);
        }
        catch (NotAuthorizedException)
        {
            return Unauthorized();
        }
    }

    [HttpPost("passwords")]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userHelper.GetUserFromHttpContext(HttpContext);
            await _userService.ChangeUsersPassword(user.Id, request, cancellationToken);
            return Ok();
        }
        catch (AuthenticationException)
        {
            return Forbid();
        }
        catch (NotAuthorizedException)
        {
            return Unauthorized();
        }
    }

    [HttpPost]
    public async Task<IActionResult> DeactivateAccount(DeactivateAccountRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userHelper.GetUserFromHttpContext(HttpContext);
            await _userService.DeactivateAccount(user.Id, request, cancellationToken);
            return Ok();
        }
        catch (AuthenticationException)
        {
            return Forbid();
        }
        catch (NotAuthorizedException)
        {
            return Unauthorized();
        }
    }

    private void SetTokenCookie(string token)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddDays(7)
        };
        Response.Cookies.Append(Consts.RefreshTokenCookieName, token, cookieOptions);
    }
}
