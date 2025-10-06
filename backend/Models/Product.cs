namespace BakeryWebsiteBackend.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string ImageName { get; set; } = string.Empty;

        public string? Tags { get; set; }

        public string? Details { get; set; } = string.Empty;
    }
}
