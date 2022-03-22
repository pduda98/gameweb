namespace GameWeb.Models.Responses;

public class GenresListResponse
{
	public List<string> Genres { get; set; } = null!;

    public GenresListResponse()
    {
        Genres = new List<string>();
    }
}