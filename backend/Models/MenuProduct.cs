using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryWebsiteBackend.Models
{
    [Table("MenuProducts")]
    public class MenuProduct
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int MenuHighlightId { get; set; }

        [Required]
        public string Image { get; set; } = string.Empty;

        [ForeignKey("MenuHighlightId")]
        public MenuHighlight? MenuHighlight { get; set; }
    }
}
