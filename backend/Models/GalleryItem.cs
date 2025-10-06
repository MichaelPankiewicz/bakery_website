using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BakeryWebsiteBackend.Models
{
    [Table("GalleryItems")]
    public class GalleryItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Image { get; set; } = string.Empty;
    }
}
