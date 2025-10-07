using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryWebsiteBackend.Models
{
    [Table("MenuHighlights")]
    public class MenuHighlight
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Image { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty;

        public ICollection<MenuIngredient>? Ingredients { get; set; }
        public ICollection<MenuProduct>? Products { get; set; }
        public ICollection<MenuPartner>? Partners { get; set; }
    }
}
