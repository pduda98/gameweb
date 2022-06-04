namespace GameWeb.Models.Projections;

public class ReviewListProjection
{
    public Guid Id { get; set; }
    public string? Title { get; set; } = null!;
    public string? Content { get; set; } = null!;
    public DateTime CreationTime { get; set; }
    public string UserName { get; set; } = null!;
    public Guid UserId { get; set; }
    public int? Rating { get; set; }
}