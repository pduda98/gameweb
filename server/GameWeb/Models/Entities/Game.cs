namespace GameWeb.Models.Entities
{
    public partial class Game
    {
        public Game()
        {
            GameGenres = new HashSet<GameGenre>();
            Ratings = new HashSet<Rating>();
            Reviews = new HashSet<Review>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime? ReleaseDate { get; set; }
        public long DeveloperId { get; set; }
        public Guid Guid { get; set; }
        public string? Description { get; set; }

        public virtual Developer Developer { get; set; } = null!;
        public virtual ICollection<GameGenre> GameGenres { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
