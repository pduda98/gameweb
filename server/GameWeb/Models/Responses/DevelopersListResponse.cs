using GameWeb.Models.Projections;

namespace GameWeb.Models.Responses;

public class DevelopersListResponse
{
	public List<DeveloperProjection> Developers { get; set; } = null!;

    public DevelopersListResponse(List<DeveloperProjection> developers)
    {
        Developers = developers;
    }
}
