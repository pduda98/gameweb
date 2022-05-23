using GameWeb.Models.Projections;

namespace GameWeb.Models.Responses;

public class LastReviewsListResponse
{
	public List<LastReviewsListProjection> Reviews { get; set; } = null!;
	public LastReviewsListResponse(List<LastReviewsListProjection> reviews)
	{
		Reviews = reviews;
	}
}
