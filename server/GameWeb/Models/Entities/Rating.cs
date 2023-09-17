namespace GameWeb.Models.Entities
{
    public partial class Rating
    {
        public long Id { get; set; }
        public long GameId { get; set; }
        public long UserId { get; set; }
        public int Value { get; set; }

        public virtual Game Game { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
