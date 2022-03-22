using System.Text.Json.Serialization;

namespace GameWeb.Models.Requests;

public class AddDeveloperRequest
{
	public string Name { get; set; } = null!;
	public string? Description { get; set; }
	public string? Location { get; set; }
	public int EstablishmentYear { get; set; }
	public string? WebAddress { get; set; }
}
