namespace GameWeb.Models.Responses;
using Models.Entities;

public class Add_UpdateGenreResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }

    public Add_UpdateGenreResponse(Genre genre)
    {
        Id = genre.Guid;
        Name = genre.Name;
    }
}