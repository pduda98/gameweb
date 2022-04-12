using GameWeb.Exceptions;
using GameWeb.Models.Requests;
using GameWeb.Services.Interfaces;
using GameWeb.Helpers.Interfaces;
using Microsoft.AspNetCore.Mvc;
using GameWeb.Authorization;

namespace GameWeb.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/games")]
public class GameController : ControllerBase
{
    private readonly IGameService _gameService;
    private readonly IUserHelper _userHelper;
    private readonly ILogger<GameController> _logger;

    public GameController(
        IGameService gameService,
        IUserHelper userHelper,
        ILogger<GameController> logger)
    {
        _gameService = gameService;
        _userHelper = userHelper;
        _logger = logger;
    }

    [AuthorizeAdmin]
    [HttpPost]
    public async Task<IActionResult> AddGame([FromBody]AddGameRequest request, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _gameService.AddGame(request, cancellationToken));
        }
        catch(BadRequestException)
        {
            return BadRequest();
        }
        catch(EntityNotFoundException)
        {
            return NotFound();
        }
    }

    [AuthorizeAdmin]
    [HttpPut("{gameId}")]
    public async Task<IActionResult> UpdateGame(
        Guid gameId,
        [FromBody]UpdateGameRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _gameService.UpdateGame(gameId, request, cancellationToken));
        }
        catch(EntityNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("{gameId}")]
    public async Task<IActionResult> GetGame(Guid gameId, CancellationToken cancellationToken)
    {
        try
        {
            //var user = _userHelper.GetUserFromHttpContext(HttpContext);
            return Ok(await _gameService.GetGame(gameId, null, cancellationToken));
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{gameId}")]
    public async Task<IActionResult> RemoveGame(Guid gameId, CancellationToken cancellationToken)
    {
        try
        {
            await _gameService.RemoveGame(gameId, cancellationToken);
            return NoContent();
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }
}