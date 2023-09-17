namespace GameWeb.Models.Requests;

public class AddGameRequest
{
	public string Name { get; set; } = null!;
	public string? Description { get; set; }
	public DateTime ReleaseDate { get; set; }
	public List<string> Genres { get; set; }
	public Guid DeveloperId { get; set; }

	public AddGameRequest()
    {
        Genres = new List<string>();
    }
}