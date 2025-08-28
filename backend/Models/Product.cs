public class Product
{
    public int Id { get; set; }                  // Unique identifier for the product
    public string Image { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }          // Price of the product
    public string Description { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new List<string>();
}