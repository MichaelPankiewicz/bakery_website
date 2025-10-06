using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend.Models;

namespace BakeryWebsiteBackend
{
    public class BakeryDbContext : DbContext
    {
        public BakeryDbContext(DbContextOptions<BakeryDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<AboutExploreDto> AboutExploreDto { get; set; }
        public DbSet<ExploreMoreDto> ExploreMore { get; set; }
        public DbSet<BakeryItem> BakeryItems { get; set; }
        public DbSet<ChefDto> Chef { get; set; }
        
    }
}
