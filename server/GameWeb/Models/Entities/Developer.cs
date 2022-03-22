namespace GameWeb.Models.Entities
{
    public partial class Developer
    {
        public Developer()
        {
            Games = new HashSet<Game>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public int? EstablishmentYear { get; set; }
        public string? Description { get; set; }
        public string? WebAddress { get; set; }
        public Guid Guid { get; set; }

        public virtual ICollection<Game> Games { get; set; }
    }
}
