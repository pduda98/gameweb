namespace GameWeb.Models.Responses;
using GameWeb.Models.Projections;

public class AddUpdateGameResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public DateTime ReleaseDate { get; set; }
    public List<string>? Genres { get; set; } = null!;
	public GameDeveloperProjection? Developer { get; set; } = null!;
    public AddUpdateGameResponse()
    {
        Genres = new List<string>();
    }
}