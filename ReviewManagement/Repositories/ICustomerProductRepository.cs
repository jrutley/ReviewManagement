using System.Collections.Generic;
using ReviewManagement.Models;

namespace ReviewManagement.Controllers
{
  public interface ICustomerProductRepository
  {
    IEnumerable<string> GetCustomerEmails();
    Customer GetFullyLoadedCustomer(string email);
    void AddReviewForCustomer(ReviewFromCustomerDTO review);
  }
}
