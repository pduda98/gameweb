using GameWeb.Exceptions;
using GameWeb.Models.Requests;
using GameWeb.Helpers.Interfaces;
using GameWeb.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GameWeb.Controllers;

[ApiController]
[Route("api/v1/games/{gameId}/ratings")]
public class RatingController : ControllerBase
{
    private readonly IRatingService _ratingService;
    private readonly IUserHelper _userHelper;
    private readonly ILogger<RatingController> _logger;

    public RatingController(IRatingService ratingService, IUserHelper userHelper, ILogger<RatingController> logger)
    {
        _ratingService = ratingService;
        _userHelper = userHelper;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> AddRating(Guid gameId, [FromBody]AddUpdateRatingRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userHelper.GetUserFromHttpContext(HttpContext);
            await _ratingService.AddRating(gameId, user, request, cancellationToken);
            return Ok();
        }
        catch(BadRequestException)
        {
            return BadRequest();
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPut("{ratingId}")]
    public async Task<IActionResult> UpdateRating(
        Guid gameId,
        long ratingId,
        [FromBody]AddUpdateRatingRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var user = _userHelper.GetUserFromHttpContext(HttpContext);
            await _ratingService.UpdateRating(ratingId, user, gameId, request, cancellationToken);
            return Ok();
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

    [HttpDelete("{ratingId}")]
    public async Task<IActionResult> RemoveRating(long ratingId, Guid gameId, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userHelper.GetUserFromHttpContext(HttpContext);
            await _ratingService.RemoveRating(ratingId, user, gameId, cancellationToken);
            return NoContent();
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }
}