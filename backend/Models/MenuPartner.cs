using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryWebsiteBackend.Models
{
    [Table("MenuPartners")]
    public class MenuPartner
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int MenuHighlightId { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Link { get; set; } = string.Empty;

        [ForeignKey("MenuHighlightId")]
        public MenuHighlight? MenuHighlight { get; set; }
    }
}
