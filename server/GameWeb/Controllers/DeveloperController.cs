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
[Route("api/v1/developers")]
public class DeveloperController : ControllerBase
{
    private readonly IDeveloperService _developerService;
    private readonly IUserHelper _userHelper;
    private readonly ILogger<DeveloperController> _logger;

    public DeveloperController(
        IDeveloperService developerService,
        IUserHelper userHelper,
        ILogger<DeveloperController> logger)
    {
        _developerService = developerService;
        _userHelper = userHelper;
        _logger = logger;
    }

    [AuthorizeAdmin]
    [HttpPost]
    public async Task<IActionResult> AddDeveloper([FromBody]AddDeveloperRequest request, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _developerService.AddDeveloper(request, cancellationToken));
        }
        catch(BadRequestException)
        {
            return BadRequest();
        }
    }

    [AuthorizeAdmin]
    [HttpPut("{developerId}")]
    public async Task<IActionResult> UpdateDeveloper(
        Guid developerId,
        [FromBody]UpdateDeveloperRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _developerService.UpdateDeveloper(developerId, request, cancellationToken));
        }
        catch(BadRequestException)
        {
            return BadRequest();
        }
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetDevelopers(int? page, int? limit, CancellationToken cancellationToken)
    {
        return Ok(await _developerService.GetDevelopers(page, limit, cancellationToken));
    }

    [AllowAnonymous]
    [HttpGet("{developerId}")]
    public async Task<IActionResult> GetDeveloper(Guid developerId, CancellationToken cancellationToken)
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
            return Ok(await _developerService.GetDeveloper(developerId, userId, cancellationToken));
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }

    [AuthorizeAdmin]
    [HttpDelete("{developerId}")]
    public async Task<IActionResult> RemoveDeveloper(Guid developerId, CancellationToken cancellationToken)
    {
        try
        {
            await _developerService.RemoveDeveloper(developerId, cancellationToken);
            return NoContent();
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }
}
