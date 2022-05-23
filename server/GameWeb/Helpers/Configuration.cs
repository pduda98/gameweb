namespace GameWeb.Helpers;

public static class Configuration
{
    public static string? ConnectionString { get; set; }
    public static string? TokenSecret { get; set; }
    public static int? DefaultNumberOfLastReviews { get; set; }
}
