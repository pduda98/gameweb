namespace GameWeb.Models.Responses;

public class SignInResponse
{
    public string Token { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public DateTime ExpirationTime { get; set; }
    public Guid UserId { get; set; }
}
