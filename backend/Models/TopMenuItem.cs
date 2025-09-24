namespace bakery_website_backend.Models
{
    public class TopMenuItem
    {
    public int Id { get; set; }
    public required string Title { get; set; } = string.Empty;
    public required string Description { get; set; } = string.Empty;
    public required string Price { get; set; } = string.Empty;
    public required string Image { get; set; } = string.Empty;
    public required List<string> Details { get; set; } = new List<string>();
    }
}
