using GameWeb.Models.Responses;

namespace GameWeb.Services.Interfaces;

public interface ISearchService
{
    Task<SearchResponse> Search(string searchString, CancellationToken cancellationToken);
}
