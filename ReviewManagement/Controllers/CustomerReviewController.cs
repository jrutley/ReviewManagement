using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Controllers.ViewModels;
using ReviewManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace ReviewManagement.Controllers
{
  [Route("api/[controller]")]
  public class CustomerReviewController : Controller
  {
    private ProductContext _customerDb;

    public CustomerReviewController(ProductContext customerDb)
    {
      _customerDb = customerDb;
    }

    [HttpGet("[action]")]
    public IActionResult MyProductsAndReviews([FromQuery] string email) // Don't do this in a real app!
    {
      var customer = _customerDb.Customers
              .Include(c => c.Products)
              .ThenInclude(cp => cp.Product)
              .ThenInclude(p => p.Reviews)
              .SingleOrDefault(c => c.Email == email);
      if (customer == null) return Ok(new List<CustomerViewDTO>());
      var productMapping = customer
          .Products
          .Select(cp => cp.Product)
          .Select(product => { return new CustomerViewDTO { Product = product, Review = product.Reviews.SingleOrDefault(r => r.CustomerId == customer.CustomerId) }; }).ToList();
      // Need to wrap this with a data property
      var wrapped = new CustomerViewDTOWrapper { Data = productMapping };
      return Ok(wrapped);
    }
  }
}