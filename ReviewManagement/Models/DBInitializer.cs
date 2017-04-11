using System.Linq;

namespace ReviewManagement.Models
{
    public static class DbInitializer
    {
        public static void Initialize(ProductContext context)
        {
            context.Database.EnsureCreated();

            if(context.Products.Any())
            {
                return;
            }

            var customers = new Customer[]
            {
                new Customer{CustomerId = 1, Email = "helmet@spaceballs.com", Name = "Dark Helmet"}
            };

            foreach (var c in customers)
            {
                context.Customers.Add(c);
            }


            var products = new Product[]
            {
                new Product{Description = "Loves money and power", Name = "Princess Vespa doll", ProductId = 1 }
            };

            foreach (var p in products)
            {
                context.Products.Add(p);
            }

            var reviews = new Review[]
            {
                new Review{Comments = "Love it!", CustomerId = 1, ReviewId = 1, Stars = 5}
            };

            foreach (var r in reviews)
            {
                context.Reviews.Add(r);
            }

            context.SaveChanges();
        }
    }
}