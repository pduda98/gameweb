namespace GameWeb.Models.Projections;

public class SearchGameProjection
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public int ReleaseYear { get; set; }
}