namespace GameWeb.Models.Projections;

public class LastReviewsListProjection
{
    public string? Title { get; set; } = null!;
    public DateTime CreationTime { get; set; }
    public string UserName { get; set; } = null!;
    public int? Rating { get; set; }
    public LastReviewListGameProjection Game { get; set; } = null!;
}