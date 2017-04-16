using System.Collections.Generic;
using System.Linq;
using ReviewManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace ReviewManagement.Controllers
{
  public class CustomerProductRepository : ICustomerProductRepository
  {
    public CustomerProductRepository(ProductContext customerDb)
    {
      _customerDb = customerDb;
    }
    private ProductContext _customerDb;

    public IEnumerable<string> GetCustomerEmails()
    {
      return _customerDb.Customers.Select(c => c.Email);
    }

    public Customer GetFullyLoadedCustomer(string email)
    {
      return _customerDb.Customers
              .Include(c => c.Products)
              .ThenInclude(cp => cp.Product)
              .ThenInclude(p => p.Reviews)
              .SingleOrDefault(c => c.Email == email);
    }

    public Customer GetCustomer(string email)
    {
      return _customerDb.Customers.SingleOrDefault(c => c.Email == email);
    }

    public void AddReviewForCustomer(ReviewFromCustomer review)
    {
      var customer = _customerDb.Customers.SingleOrDefault(c => c.Email == review.CustomerEmail);
      if (customer == null) throw new NotFoundException(review.CustomerEmail);
      var product = _customerDb.Products.Include(p => p.Reviews).SingleOrDefault(p => p.ProductId == review.ProductId);
      product.Reviews.Add(new Review { CustomerId = customer.CustomerId, Stars = 5 /* TODO: Fix */, Comments = review.Review });
      _customerDb.SaveChanges();
    }
  }
}
