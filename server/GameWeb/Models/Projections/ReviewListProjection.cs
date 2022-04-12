namespace GameWeb.Models.Projections;

public class ReviewListProjection
{
    public string? Title { get; set; } = null!;
    public DateTime CreationTime { get; set; }
    public string UserName { get; set; } = null!;
    public int? Rating { get; set; }
}