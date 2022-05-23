namespace GameWeb.Models.Projections;

public class LastReviewListGameProjection
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public int ReleaseYear { get; set; }
    public long? AverageRating { get; set; }
    public int RatingsCount { get; set; }
    public List<string>? Genres { get; set; } = null!;
	public GameDeveloperProjection? Developer { get; set; } = null!;
    public LastReviewListGameProjection()
    {
        Genres = new List<string>();
    }
}