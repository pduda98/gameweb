namespace GameWeb.Models.Requests;

public class AddReviewRequest
{
    public string Title { get; set; } = null!;
	public string Content { get; set; } = null!;
	public int? Rating { get; set; }
}
