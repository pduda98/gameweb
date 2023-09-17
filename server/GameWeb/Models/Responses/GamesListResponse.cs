using GameWeb.Models.Projections;

namespace GameWeb.Models.Responses;

public class GamesListResponse
{
    public List<GameListProjection> Games { get; set; } = null!;
    public GamesListResponse(List<GameListProjection> games)
    {
		Games = games;
    }
}