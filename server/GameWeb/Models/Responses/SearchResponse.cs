using GameWeb.Models.Projections;

namespace GameWeb.Models.Responses;

public class SearchResponse
{
    public List<SearchGameProjection> Games { get; set; } = null!;
    public List<SearchDeveloperProjection> Developers { get; set; } = null!;
	public SearchResponse(List<SearchGameProjection> games, List<SearchDeveloperProjection> developers)
	{
		Games = games;
        Developers = developers;
	}
}
