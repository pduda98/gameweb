namespace GameWeb.Models.Entities;

public class RefreshToken
{
    public long Id { get; set; }
    public string Token { get; set; } = null!;
    public DateTime ExpirationTime { get; set;}
    public long UserId { get; set; }

	public User User { get; set; } = null!;
}
