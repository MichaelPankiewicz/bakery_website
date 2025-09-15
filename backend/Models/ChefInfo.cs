namespace BakeryAPI.Models
{
    /// <summary>
    /// Model voor chef-informatie.
    /// </summary>
    public class ChefInfo
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
