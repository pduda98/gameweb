namespace GameWeb.Models.Requests;

public class UpdateGameRequest
{
	public string? Name { get; set; }
	public string? Description { get; set; }
	public DateTime? ReleaseDate { get; set; }
	public List<string>? Genres { get; set; }
	public Guid? DeveloperId { get; set; }

	public UpdateGameRequest()
    {
        Genres = new List<string>();
    }
}