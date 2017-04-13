using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReviewManagement.Models
{
  public class Customer
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CustomerId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public ICollection<CustomerProduct> Products { get; set; }
  }

  public class CustomerProduct
  {
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }

    public int ProductId { get; set; }
    public Product Product { get; set; }
  }

  public class Product
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public ICollection<Review> Reviews { get; set; }
  }

  public class Review
  {
    public int CustomerId { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ReviewId { get; set; }

    public int Stars { get; set; }

    public string Comments { get; set; }
  }

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