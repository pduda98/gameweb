using GameWeb.Models.Projections;

namespace GameWeb.Models.Responses;

public class ReviewResponse
{
    public string? Title { get; set; }
    public string? Content { get; set; }
    public DateTime CreationTime { get; set; }
    public SimpleGameProjection Game { get; set; } = null!;
    public string UserName { get; set; } = null!;
    public int? Rating { get; set; }
}
