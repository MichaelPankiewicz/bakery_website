using Microsoft.EntityFrameworkCore;

    public class BakeryDbContext : DbContext
    {
        public BakeryDbContext(DbContextOptions<BakeryDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }

