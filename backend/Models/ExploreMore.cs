namespace BakeryAPI.Models
{
    /// <summary>
    /// Model voor extra informatie over de bakkerij.
    /// </summary>
    public class ExploreMore
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
