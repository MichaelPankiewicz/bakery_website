namespace YourNamespace.Models
{
    /// <summary>
    /// Model voor een product in de bakkerij.
    /// </summary>
    public class Product
    {
        /// <summary>
        /// Unieke identificatie voor het product.
        /// </summary>
        public int Id { get; set; }                  // Unique identifier for the product

        /// <summary>
        /// URL naar de productafbeelding.
        /// </summary>
        public string Image { get; set; } = string.Empty;

        /// <summary>
        /// Naam van het product.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Prijs van het product.
        /// </summary>
        public decimal Price { get; set; }           // Price of the product

        /// <summary>
        /// Beschrijving van het product.
        /// </summary>
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Lijst met tags die het product kenmerken.
        /// </summary>
        public List<string> Tags { get; set; } = new List<string>();
    }
}
