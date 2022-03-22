namespace GameWeb.Models.Entities
{
    public partial class Genre
    {
        public Genre()
        {
            GameGenres = new HashSet<GameGenre>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public Guid Guid { get; set; }

        public virtual ICollection<GameGenre> GameGenres { get; set; }
    }
}
