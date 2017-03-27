using System;
using Microsoft.EntityFrameworkCore;

namespace ReviewManagement.Models
{
    public class Product
    {
        public Guid ProductId {get; set;}
        public string Name {get; set;}
        public string Description {get; set;}
    }

    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options)
            :base(options)
        { }
        public DbSet<Product> Products { get; set; }
    }
}