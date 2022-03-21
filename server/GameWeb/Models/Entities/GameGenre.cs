using System;
using System.Collections.Generic;

namespace GameWeb.Models.Entities
{
    public partial class GameGenre
    {
        public long Id { get; set; }
        public long GameId { get; set; }
        public long GenreId { get; set; }

        public virtual Game Game { get; set; } = null!;
        public virtual Genre Genre { get; set; } = null!;
    }
}
