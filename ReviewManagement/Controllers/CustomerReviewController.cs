using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Controllers.ViewModels;
using ReviewManagement.Models;

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
      var customer = _customerDb.Customers.SingleOrDefault(c => c.Email == email);
      if (customer == null) return Ok(new List<CustomerViewDTO>());
      var productMapping = customer.Products.Select(p => { return new CustomerViewDTO { Product = p.Product, Review = p.Product.Reviews.SingleOrDefault(r => r.CustomerId == customer.CustomerId) }; }).ToList();
      return Ok(productMapping);
    }
  }
}