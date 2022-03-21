using System;
using System.Collections.Generic;

namespace GameWeb.Models.Entities
{
    public partial class Review
    {
        public long Id { get; set; }
        public string? Title { get; set; }
        public string? ReviewContent { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? LastUpdateTime { get; set; }
        public long UserId { get; set; }
        public long GameId { get; set; }
        public long? RatingId { get; set; }
        public Guid Guid { get; set; }

        public virtual Game Game { get; set; } = null!;
        public virtual Rating? Rating { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
