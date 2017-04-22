using System.Linq;
using Microsoft.EntityFrameworkCore;
using ReviewManagement.Models;

namespace ReviewManagement.Controllers
{
  public class ReviewRepository : IReviewRepository
  {
    private ProductContext _dbContext;

    public ReviewRepository(ProductContext context)
    {
      _dbContext = context;
    }
    public Customer[] GetCustomers()
    {
      return _dbContext.Customers.ToArray();
    }

    public Product[] GetProductsWithAllReviews()
    {
      return _dbContext.Products.Include(p => p.Reviews).ToArray();
    }
  }
}
