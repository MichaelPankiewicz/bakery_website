using System.Collections.Generic;
namespace BakeryWebsiteBackend.Models
{
    public class MenuHighlightDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public List<IngredientDto>? Ingredients { get; set; }
        public List<string>? Products { get; set; }
        public List<PartnerDto>? Partners { get; set; }
    }
}