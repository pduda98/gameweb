namespace GameWeb.Helpers;

public static class OnStartConfigurationHelper
{
    public static void Configure()
    {
        Configuration.TokenSecret = Environment.GetEnvironmentVariable(Consts.TokenSecretEnvVarName) 
            ?? throw new ArgumentException();
        Configuration.ConnectionString = Environment.GetEnvironmentVariable(Consts.ConnectionStringEnvVarName) 
            ?? throw new ArgumentException();
        var DefaultNumberOfLastReviewsString = Environment.GetEnvironmentVariable(Consts.DefaultNumberOfLastReviewsEnvVarName) 
            ?? throw new ArgumentException();
        Configuration.DefaultNumberOfLastReviews = Int32.Parse(DefaultNumberOfLastReviewsString);
    }
}
