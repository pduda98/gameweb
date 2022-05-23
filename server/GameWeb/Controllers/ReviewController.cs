using System.Security.Authentication;
using GameWeb.Authorization;
using GameWeb.Exceptions;
using GameWeb.Helpers.Interfaces;
using GameWeb.Models.Requests;
using GameWeb.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GameWeb.Controllers;

[Authorize]
[ApiController]
[Route("api/v1")]
public class ReviewController : ControllerBase
{
    private readonly IReviewService _ReviewService;
    private readonly IUserHelper _userHelper;
    private readonly ILogger<ReviewController> _logger;

    public ReviewController(
        IReviewService ReviewService,
        IUserHelper userHelper,
        ILogger<ReviewController> logger)
    {
        _ReviewService = ReviewService;
        _userHelper = userHelper;
        _logger = logger;
    }

    [HttpPost("games/{gameId}/reviews")]
    public async Task<IActionResult> AddReview(Guid gameId, [FromBody]AddReviewRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userHelper.GetUserFromHttpContext(HttpContext);
            return Ok(await _ReviewService.AddReview(request, user, gameId, cancellationToken));
        }
        catch(BadRequestException)
        {
            return BadRequest();
        }
    }

    [HttpPut("games/{gameId}/reviews/{reviewId}")]
    public async Task<IActionResult> UpdateReview(
        Guid gameId,
        Guid reviewId,
        [FromBody]UpdateReviewRequest request,  
        CancellationToken cancellationToken)
    {
        try
        {
            var user = _userHelper.GetUserFromHttpContext(HttpContext);
            return Ok(await _ReviewService.UpdateReview(gameId, reviewId, request, user, cancellationToken));
        }
        catch(BadRequestException)
        {
            return BadRequest();
        }
        catch (NotAuthorizedException)
        {
            return Unauthorized();
        }
    }

    [AllowAnonymous]
    [HttpGet("reviews")]
    public async Task<IActionResult> GetLastReviews(int? limit, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _ReviewService.GetLastReviews(limit, cancellationToken));
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }

    [AllowAnonymous]
    [HttpGet("games/{gameId}/reviews")]
    public async Task<IActionResult> GetGameReviews(Guid gameId, int? page, int? limit, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _ReviewService.GetGameReviews(gameId, page, limit, cancellationToken));
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }

    [AllowAnonymous]
    [HttpGet("games/{gameId}/reviews/{reviewId}")]
    public async Task<IActionResult> GetReview(Guid gameId, Guid reviewId, CancellationToken cancellationToken)
    {
        try
        {
            long? userId;
            try
            {
                var user = _userHelper.GetUserFromHttpContext(HttpContext);
                userId = user.Id;   
            }
            catch (AuthenticationException)
            {
                userId = null;
            }
            return Ok(await _ReviewService.GetReview(gameId, reviewId, userId, cancellationToken));
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("games/{gameId}/reviews/{reviewId}")]
    public async Task<IActionResult> RemoveReview(Guid gameId, Guid reviewId, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userHelper.GetUserFromHttpContext(HttpContext);
            await _ReviewService.RemoveReview(gameId, reviewId, user, cancellationToken);
            return NoContent();
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
        catch (NotAuthorizedException)
        {
            return Unauthorized();
        }
    }
}
