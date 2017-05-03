using System;
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

    static Random random = new Random();
    private static DateTimeOffset GenerateDate()
    {
      var edt = new TimeSpan(-4, 0, 0);
      var days = random.Next(0, 30) * -1;
      var hours = random.Next(0, 23) * -1;
      var minutes = random.Next(0, 59) * -1;
      var seconds = random.Next(0, 59) * -1;
      var now = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Unspecified);
      var newOffset = new DateTimeOffset(now, edt);
      return newOffset.Add(new TimeSpan(days, hours, minutes, seconds));
    }

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
                  new Review{DateTime = GenerateDate(), Comments = "So kissable", CustomerId = darkHelmet.CustomerId, Stars = 5, State = ReviewStateEnum.New },
              } },
          new Product {Description = "Rugged and handsome", Name = "LoneStar doll", Reviews = new[]{
              new Review{DateTime = GenerateDate(), Comments = "Can't stand him", CustomerId = darkHelmet.CustomerId, Stars = 1, State = ReviewStateEnum.Answered },
              new Review{DateTime = GenerateDate(), Comments = "Looks like me!", CustomerId = vespa.CustomerId, Stars = 5, State=ReviewStateEnum.Reviewed}
          } },
          new Product {Description = "Half man/Half dog. He's a mog!", Name = "Barf doll", Reviews = new Review[0]},
          new Product {Description = "6 foot long flame", Name = "Spaceballs, the flamethrower", Reviews = new []{
              new Review{DateTime = GenerateDate(), Comments = "The kids love this one", CustomerId = yogurt.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "", Name = "Spaceballs, the breakfast cereal", Reviews = new []{
              new Review{DateTime = GenerateDate(), Comments = "borrrrring", CustomerId = valium.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed },
              new Review{DateTime = GenerateDate(), Comments = "AWESOME!", CustomerId = lonestar.CustomerId, Stars = 5, State = ReviewStateEnum.Reviewed },
              new Review{DateTime = GenerateDate(), Comments = "I like dog food better", CustomerId = barf.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "", Name = "Spaceballs, the T-shirt", Reviews = new []{
              new Review{DateTime = GenerateDate(), Comments = "borrrrring", CustomerId = valium.CustomerId, Stars = 2, State = ReviewStateEnum.Reviewed },
              new Review{DateTime = GenerateDate(), Comments = "Nice cotton", CustomerId = lonestar.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "", Name = "Spaceballs, the lunch box", Reviews = new []{
              new Review{DateTime = GenerateDate(), Comments = "borrrrring", CustomerId = valium.CustomerId, Stars = 3, State = ReviewStateEnum.Reviewed },
              new Review{DateTime = GenerateDate(), Comments = "Good for holding dog food", CustomerId = barf.CustomerId, Stars = 4, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "May the Schwartz be with you", Name = "Spaceballs, the Yogurt doll", Reviews = new []{
              new Review{DateTime = GenerateDate(), Comments = "borrrrring", CustomerId = valium.CustomerId, Stars = 2, State = ReviewStateEnum.Reviewed },
              new Review{DateTime = GenerateDate(), Comments = "So adorable", CustomerId = yogurt.CustomerId, Stars = 5, State = ReviewStateEnum.Reviewed }
          } },
          new Product {Description = "2-ply", Name = "Spaceballs, the toilet paper", Reviews = new Review[0] },
          new Product {Description = "Shows your reflection", Name = "Spaceballs, the mirror", Reviews = new Review[0] },
          new Product {Description = "Brushes your hair", Name = "Spaceballs, the brush", Reviews = new Review[0] },
          new Product {Description = "Not good for combing deserts", Name = "Spaceballs, the comb", Reviews = new Review[0] },
          new Product {Description = "Helps with shaving", Name = "Spaceballs, the shaving cream", Reviews = new Review[]{
            new Review {DateTime = GenerateDate(), Comments = "Never know when you might need it", CustomerId = lonestar.CustomerId, Stars = 5, State = ReviewStateEnum.New}
          } },
          new Product {Description = "Gets you clean", Name = "Spaceballs, the soap", Reviews = new Review[0] },
          new Product {Description = "Wheels you around", Name = "Spaceballs, the scooter", Reviews = new Review[0] },
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
          new CustomerProduct{CustomerId = darkHelmet.CustomerId, Product = products[8]},
          new CustomerProduct{CustomerId = vespa.CustomerId, Product = products[9]},
          new CustomerProduct{CustomerId = valium.CustomerId, Product = products[10]},
          new CustomerProduct{CustomerId = lonestar.CustomerId, Product = products[11]},
          new CustomerProduct{CustomerId = barf.CustomerId, Product = products[12]},
          new CustomerProduct{CustomerId = darkHelmet.CustomerId, Product = products[9]},
          new CustomerProduct{CustomerId = vespa.CustomerId, Product = products[10]},
          new CustomerProduct{CustomerId = valium.CustomerId, Product = products[11]},
          new CustomerProduct{CustomerId = lonestar.CustomerId, Product = products[13]},
          new CustomerProduct{CustomerId = barf.CustomerId, Product = products[8]},
          new CustomerProduct{CustomerId = darkHelmet.CustomerId, Product = products[10]},
          new CustomerProduct{CustomerId = vespa.CustomerId, Product = products[11]},
          new CustomerProduct{CustomerId = valium.CustomerId, Product = products[12]},
          new CustomerProduct{CustomerId = lonestar.CustomerId, Product = products[8]},
          new CustomerProduct{CustomerId = barf.CustomerId, Product = products[9]},
      };
      foreach (var cp in customerProductJoinTable)
      {
        try
        {
          context.CustomerProduct.Add(cp);
        }
        catch (InvalidOperationException)
        {
          Console.WriteLine($"Looks like you are trying to add someone who already has a review: CustomerId {cp.CustomerId}.");
          throw;
        }
      }

      context.SaveChanges();
    }
  }
}