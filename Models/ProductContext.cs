using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ReviewManagement.Models
{
    public class Product
    {
        public Guid ProductId {get; set;}
        public string Name {get; set;}
        public string Description {get; set;}

        public List<Review> Reviews{get;set;}
    }

    public class Review 
    {
        public Guid ReviewId {get;set;}

        public int Stars {get;set;}

        public string Comments {get;set;}
    }

    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options)
            :base(options)
        { }
        public DbSet<Product> Products { get; set; }
    }
}