using System.Collections.Generic;
namespace BakeryAPI.Models
{
    /// <summary>
    /// Model voor een topmenu-item.
    /// </summary>
    public class TopMenuItem
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public List<string> Details { get; set; } = new List<string>();
    }
}
