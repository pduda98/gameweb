using GameWeb.Authorization;
using GameWeb.Helpers;
using GameWeb.Helpers.Interfaces;
using GameWeb.Middleware;
using GameWeb.Models;
using GameWeb.Services;
using GameWeb.Services.Interfaces;

OnStartConfigurationHelper.Configure();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DbContext
builder.Services.AddDbContext<GameWebContext>();

// Services
builder.Services.AddScoped<IDeveloperService, DeveloperService>();
builder.Services.AddScoped<IGenreService, GenreService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IGameService, GameService>();
builder.Services.AddScoped<IRatingService, RatingService>();
builder.Services.AddScoped<IReviewService, ReviewService>();

// Helpers
builder.Services.AddScoped<IUserHelper, UserHelper>();
builder.Services.AddScoped<IJwtHelper, JwtHelper>();

builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
    {
        builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corsapp");

app.UseHttpsRedirection();

app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();
