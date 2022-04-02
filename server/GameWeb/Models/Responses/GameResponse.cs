namespace GameWeb.Models.Responses;
using GameWeb.Models.Projections;

public class GameResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public DateTime ReleaseDate { get; set; }
    public long? AverageRating { get; set; }
    public int RatingsCount { get; set; }
    public int? UsersRating { get; set; }
    public List<string>? Genres { get; set; } = null!;
	public GameDeveloperProjection? Developer { get; set; } = null!;
    public GameResponse()
    {
        Genres = new List<string>();
    }
}