namespace GameWeb.Models.Entities
{
    public partial class Rating
    {
        public Rating()
        {
            Reviews = new HashSet<Review>();
        }

        public long Id { get; set; }
        public long UserId { get; set; }
        public long GameId { get; set; }
        public int Value { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual Game Game { get; set; } = null!;
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
