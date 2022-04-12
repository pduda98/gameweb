namespace GameWeb.Models.Entities
{
    public partial class User
    {
        public User()
        {
            Ratings = new HashSet<Rating>();
            RefreshTokens = new HashSet<RefreshToken>();
            Reviews = new HashSet<Review>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public long RoleId { get; set; }
        public Guid Guid { get; set; }

        public virtual UserRole Role { get; set; } = null!;
        public virtual ICollection<Rating> Ratings { get; set; }
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
