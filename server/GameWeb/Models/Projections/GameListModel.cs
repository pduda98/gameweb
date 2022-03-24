namespace GameWeb.Models.Projections;

public class GameListProjection
{
	public Guid Id { get; set; }
    public string Name { get; set; } = null!;
	public long AverageRating { get; set; }
	public int? UsersRating { get; set; }
	public List<string> Genres { get; set; } = null!;

    public GameListProjection()
    {
        Genres = new List<string>();
    }
}