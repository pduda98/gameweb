namespace GameWeb.Models.Requests;

public class UpdateReviewRequest
{
    public string? Title { get; set; }
	public string? Content { get; set; }
	public int? Rating { get; set; }
}
