using Microsoft.EntityFrameworkCore;

namespace ReviewManagement.Models
{

  public class ProductContext : DbContext
  {
    public ProductContext(DbContextOptions<ProductContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      // SQLite doesn't support n-m relations directly
      modelBuilder.Entity<CustomerProduct>().HasKey(table => new { table.CustomerId, table.ProductId });
      modelBuilder.Entity<Customer>().HasMany(c => c.Products).WithOne(c => c.Customer);
      modelBuilder.Entity<Product>().HasMany(p => p.Reviews);
      base.OnModelCreating(modelBuilder);
    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<CustomerProduct> CustomerProduct { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Review> Reviews { get; set; }
  }
}