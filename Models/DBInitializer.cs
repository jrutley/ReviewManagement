using System.Linq;

namespace ReviewManagement.Models
{
    public class DbInitializer
    {
        public static void Initialize(ProductContext context)
        {
            context.Database.EnsureCreated();

            if(context.Products.Any())
            {
                return;
            }

            var products = new Product[]
            {
                new Product{Name="Luke Skywalker doll", Description="Uses the Force"},
                new Product{Name="Chewbacca doll", Description="ROARRRR"}
            };

            foreach (var p in products)
            {
                context.Products.Add(p);
            }

            context.SaveChanges();
        }
    }
}