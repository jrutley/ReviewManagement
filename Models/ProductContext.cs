using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ReviewManagement.Models
{
    public class Customer
    {
        public Guid CustomerId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public ICollection<CustomerProduct> Products { get; set; }
    }
    
    public class CustomerProduct
    {
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }

        public Guid ProductId { get; set; }
        public Product Product { get; set; }
    }

    public class Product
    {
        public Guid ProductId {get; set;}
        public string Name {get; set;}
        public string Description {get; set;}

        public ICollection<CustomerProduct> PurchasedBy { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }

    public class Review 
    {
        public Guid CustomerId { get; set; }

        public Guid ReviewId {get;set;}

        public int Stars {get;set;}

        public string Comments {get;set;}
    }

    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomerProduct>().HasKey(table => new { table.CustomerId, table.ProductId });
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}