namespace bakery_website_backend.Models
{
    /// <summary>
    /// Represents a gallery image item.
    /// </summary>
    public class GalleryItem
    {
        public int Id { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}