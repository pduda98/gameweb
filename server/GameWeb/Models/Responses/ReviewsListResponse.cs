using GameWeb.Models.Projections;

namespace GameWeb.Models.Responses;

public class ReviewsListResponse
{
    public List<ReviewListProjection> Reviews { get; set; } = null!;
    public ReviewsListResponse(List<ReviewListProjection> reviews)
    {
		Reviews = reviews;
    }
}
