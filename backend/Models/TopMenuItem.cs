namespace bakery_website_backend.Models
{
    public class TopMenuItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Image { get; set; }
        public List<string> Details { get; set; }
    }
}
