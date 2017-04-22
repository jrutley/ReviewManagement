using System.Linq;

namespace ReviewManagement.Models
{
  public static class DbInitializer
  {
    const string DarkHelmet = "Dark Helmet";
    const string Yogurt = "Yogurt";
    const string Vespa = "Princess Vespa";
    const string Barf = "Barf";
    const string Valium = "Prince Valium";
    const string Roland = "King Roland";
    const string LoneStar = "Lone Star";

    public static void Initialize(ProductContext context)
    {
      context.Database.EnsureCreated();

      if (context.Products.Any())
      {
        return;
      }

      var customers = new Customer[]
      {
          new Customer {Email = "helmet@spaceballs.com", Name = DarkHelmet},
          new Customer {Email = "yogurt@spaceballs.com", Name = Yogurt},
          new Customer {Email = "vespa@druidia.com", Name = Vespa},
          new Customer {Email = "barf@spaceballs.com", Name = Barf},
          new Customer {Email = "valium@spaceballs.com", Name = Valium},
          new Customer {Email = "lonestar@spaceballs.com", Name = LoneStar},
          new Customer {Email = "roland@druidia.com", Name = Roland}
      };

      foreach (var c in customers)
      {
        context.Customers.Add(c);
      }

      context.SaveChanges();

      var darkHelmet = customers.First(c => c.Name == DarkHelmet);
      var yogurt = customers.First(c => c.Name == Yogurt);
      var vespa = customers.First(c => c.Name == Vespa);
      var valium = customers.First(c => c.Name == Valium);
      var lonestar = customers.First(c => c.Name == LoneStar);
      var barf = customers.First(c => c.Name == Barf);

      var products = new Product[]
      {
          new Product {Description = "Loves money and power", Name = "Princess Vespa doll",
              Reviews = new []{
                  new Review{Comments = "So kissable", CustomerId = darkHelmet.CustomerId, Stars = 5, State = ReviewStateEnum.New },
              } },
          new Product {Description = "Rugged and handsome", Name = "LoneStar doll", Reviews = new[]{
              new Review{Comments = "Can't stand him", CustomerId = darkHelmet.CustomerId, Stars = 1, State = ReviewStateEnum.Answered },
              new Review{Comments = "Looks like me!", CustomerId = vespa.CustomerId, Stars = 5, State=ReviewStateEnum.Reviewed}
          } },
          new Product {Description = "Half man/Half dog. He's a mog!", Name = "Barf doll", Reviews = new Review[0]},
          new Product {Description = "6 foot long flame", Name = "Spaceballs, the flamethrower", Reviews = new []{
              new Review{Comments = "The kids love this one", CustomerId = yogurt.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "", Name = "Spaceballs, the breakfast cereal", Reviews = new []{
              new Review{Comments = "borrrrring", CustomerId = valium.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed },
              new Review{Comments = "AWESOME!", CustomerId = lonestar.CustomerId, Stars = 5, State = ReviewStateEnum.Reviewed },
              new Review{Comments = "I like dog food better", CustomerId = barf.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "", Name = "Spaceballs, the T-shirt", Reviews = new []{
              new Review{Comments = "borrrrring", CustomerId = valium.CustomerId, Stars = 2, State = ReviewStateEnum.Reviewed },
              new Review{Comments = "Nice cotton", CustomerId = lonestar.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "", Name = "Spaceballs, the lunch box", Reviews = new []{
              new Review{Comments = "borrrrring", CustomerId = valium.CustomerId, Stars = 3, State = ReviewStateEnum.Reviewed },
              new Review{Comments = "Good for holding dog food", CustomerId = barf.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "May the Schwartz be with you", Name = "Spaceballs, the Yogurt doll", Reviews = new []{
              new Review{Comments = "borrrrring", CustomerId = valium.CustomerId, Stars = 2, State = ReviewStateEnum.Reviewed },
              new Review{Comments = "So adorable", CustomerId = yogurt.CustomerId, Stars = 5, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "", Name = "Spaceballs, the toilet paper", Reviews = new Review[0] },
          new Product {Description = "", Name = "Spaceballs, the mirror", Reviews = new Review[0] },
          new Product {Description = "", Name = "Spaceballs, the brush", Reviews = new Review[0] },
          new Product {Description = "", Name = "Spaceballs, the comb", Reviews = new Review[0] },
          new Product {Description = "", Name = "Spaceballs, the shaving cream", Reviews = new Review[]{
            new Review {Comments = "Never know when you might need it", CustomerId = lonestar.CustomerId, Stars = 5, State = ReviewStateEnum.New}
          } },
          new Product {Description = "", Name = "Spaceballs, the soap", Reviews = new Review[0] },
          new Product {Description = "", Name = "Spaceballs, the scooter", Reviews = new Review[0] },
      };

      foreach (var p in products)
      {
        context.Products.Add(p);
      }

      context.SaveChanges();

      // Any customer who has made a review is going to be associated
      context.CustomerProduct.AddRange(products.SelectMany(p => p.Reviews.Select(r => new CustomerProduct { CustomerId = r.CustomerId, Product = p })));

      // These are products that were purchased, but no review was given
      var customerProductJoinTable = new CustomerProduct[]
      {
          new CustomerProduct{CustomerId = darkHelmet.CustomerId, Product = products[2]},
          new CustomerProduct{CustomerId = vespa.CustomerId, Product = products[2]},
      };
      foreach (var cp in customerProductJoinTable)
      {
        context.CustomerProduct.Add(cp);
      }

      context.SaveChanges();
    }
  }
}