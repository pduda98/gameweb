using GameWeb.Models.Projections;

namespace GameWeb.Models.Responses;

public class DeveloperResponse : DeveloperProjection
{
	public List<GameListProjection> Games { get; set; } = null!;

    public DeveloperResponse()
    {
        Games = new List<GameListProjection>();
    }
}
