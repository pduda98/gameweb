namespace GameWeb.Models.Projections;

public class LastReviewsListProjection
{
    public Guid Id { get; set; }
    public string? Title { get; set; } = null!;
    public string? Content { get; set; } = null!;
    public DateTime CreationTime { get; set; }
    public string UserName { get; set; } = null!;
    public int? Rating { get; set; }
    public LastReviewListGameProjection Game { get; set; } = null!;
}