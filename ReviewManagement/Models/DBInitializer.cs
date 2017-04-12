using System.Linq;

namespace ReviewManagement.Models
{
    public static class DbInitializer
    {
        const string DarkHelmet = "Dark Helmet";
        const string Yogurt = "Yogurt";

        public static void Initialize(ProductContext context)
        {
            context.Database.EnsureCreated();

            if(context.Products.Any())
            {
                return;
            }

            var customers = new Customer[]
            {
                new Customer {Email = "helmet@spaceballs.com", Name = DarkHelmet},
                new Customer {Email = "yogurt@spaceballs.com", Name = Yogurt}
            };

            foreach (var c in customers)
            {
                context.Customers.Add(c);
            }

            context.SaveChanges();

            var darkHelmet = customers.First(c => c.Name == DarkHelmet);
            var yogurt = customers.First(c => c.Name == Yogurt);

            var products = new Product[]
            {
                new Product {Description = "Loves money and power", Name = "Princess Vespa doll",
                    Reviews = new []{
                        new Review{Comments = "So kissable", CustomerId = darkHelmet.CustomerId, Stars = 5 },
                    } },
                new Product {Description = "Rugged and handsome", Name = "LoneStar doll", Reviews = new[]{
                    new Review{Comments = "Can't stand him", CustomerId = darkHelmet.CustomerId, Stars = 1 },
                } },
                new Product {Description = "Half man/Half dog. He's a mog!", Name = "Barf doll" },
                new Product {Description = "The kids love this one", Name = "Spaceballs, the flamethrower", Reviews = new []{
                    new Review{Comments = "Love to show it off!", CustomerId = yogurt.CustomerId, Stars = 4 }
                } }
            };

            foreach (var p in products)
            {
                context.Products.Add(p);
            }

            context.SaveChanges();

            var customerProductJoinTable = new CustomerProduct[]
            {
                new CustomerProduct{CustomerId = darkHelmet.CustomerId, Product = products[0]},
                new CustomerProduct{CustomerId = darkHelmet.CustomerId, Product = products[1]},
                new CustomerProduct{CustomerId = darkHelmet.CustomerId, Product = products[2]},
                new CustomerProduct{CustomerId = yogurt.CustomerId, Product = products[3]}
            };
            foreach (var cp in customerProductJoinTable)
            {
                context.CustomerProduct.Add(cp);
            }

            context.SaveChanges();
        }
    }
}