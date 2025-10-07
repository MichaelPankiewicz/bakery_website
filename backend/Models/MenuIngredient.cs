using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryWebsiteBackend.Models
{
    [Table("MenuIngredients")]
    public class MenuIngredient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int MenuHighlightId { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        
        public string? Description { get; set; }

        [ForeignKey("MenuHighlightId")]
        public MenuHighlight? MenuHighlight { get; set; }
    }
}
