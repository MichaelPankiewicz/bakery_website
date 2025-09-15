using System.Collections.Generic;
namespace BakeryAPI.Models
{
    /// <summary>
    /// Model voor een menu-highlight.
    /// </summary>
    public class MenuHighlight
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public List<object>? Details { get; set; }
    }
}
