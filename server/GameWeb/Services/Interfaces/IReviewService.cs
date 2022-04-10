using GameWeb.Models.Entities;
using GameWeb.Models.Requests;
using GameWeb.Models.Responses;

namespace GameWeb.Services.Interfaces;

public interface IReviewService
{
    Task<AddUpdateReviewResponse> AddReview(
        AddReviewRequest request,
        User user,
        Guid gameId,
        CancellationToken cancellationToken);
    Task<ReviewResponse> GetReview(
        Guid gameId,
        Guid reviewId,
        long? userId,
        CancellationToken cancellationToken);
    Task<ReviewsListResponse> GetReviews(
        Guid gameId,
        int? page,
        int? limit,
        CancellationToken cancellationToken);
    Task<AddUpdateReviewResponse> UpdateReview(
        Guid gameId,
        Guid reviewId, 
        UpdateReviewRequest request,
        User user,
        CancellationToken cancellationToken);
    Task RemoveReview(
        Guid gameId,
        Guid reviewId,
        User user,
        CancellationToken cancellationToken);
}
