using ReviewManagement.Models;

namespace ReviewManagement.Controllers
{
  public interface IReviewRepository
  {
    Product[] GetProductsWithAllReviews();
    Customer[] GetCustomers();
  }
}
