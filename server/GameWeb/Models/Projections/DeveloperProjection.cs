namespace GameWeb.Models.Projections;

public class DeveloperProjection
{
    public Guid Id { get; set; }
	public string Name { get; set; } = null!;
	public string? Description { get; set; }
	public string? Location { get; set; }
	public int EstablishmentYear { get; set; }
	public string? WebAddress { get; set; }
}
