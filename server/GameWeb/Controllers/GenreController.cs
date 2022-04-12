using GameWeb.Authorization;
using GameWeb.Exceptions;
using GameWeb.Models.Requests;
using GameWeb.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GameWeb.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/genres")]
public class GenreController : ControllerBase
{
    private readonly IGenreService _genreService;
    private readonly ILogger<GenreController> _logger;

    public GenreController(IGenreService genreService, ILogger<GenreController> logger)
    {
        _genreService = genreService;
        _logger = logger;
    }

    [AuthorizeAdmin]
    [HttpPost]
    public async Task<IActionResult> AddGenre([FromBody]AddUpdateGenreRequest request, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _genreService.AddGenre(request, cancellationToken));
        }
        catch(BadRequestException)
        {
            return BadRequest();
        }
    }

    [AuthorizeAdmin]
    [HttpPut("{genreId}")]
    public async Task<IActionResult> UpdateGenre(
        Guid genreId,
        [FromBody]AddUpdateGenreRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _genreService.UpdateGenre(genreId, request, cancellationToken));
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
    [HttpDelete("{genreId}")]
    public async Task<IActionResult> RemoveGenre(Guid genreId, CancellationToken cancellationToken)
    {
        try
        {
            await _genreService.RemoveGenre(genreId, cancellationToken);
            return NoContent();
        }
        catch (EntityNotFoundException)
        {
            return NotFound();
        }
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetGenres(int? page, int? limit, CancellationToken cancellationToken)
    {
        return Ok(await _genreService.GetGenres(page, limit, cancellationToken));
    }
}
