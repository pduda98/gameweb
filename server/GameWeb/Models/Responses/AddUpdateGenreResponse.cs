namespace GameWeb.Models.Responses;
using Models.Entities;

public class AddUpdateGenreResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }

    public AddUpdateGenreResponse(Genre genre)
    {
        Id = genre.Guid;
        Name = genre.Name;
    }
}