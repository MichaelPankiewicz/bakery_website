using Microsoft.EntityFrameworkCore;
using BakeryWebsiteBackend.Models;

namespace BakeryWebsiteBackend
{
    public class BakeryDbContext : DbContext
    {
        public BakeryDbContext(DbContextOptions<BakeryDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<AboutExploreDto> AboutExploreDto { get; set; }
    }
}
