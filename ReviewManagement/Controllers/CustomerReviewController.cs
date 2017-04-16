using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Controllers.ViewModels;
using ReviewManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ReviewManagement.Controllers
{
  public class ReviewFromCustomer
  {
    public int ProductId { get; set; }
    public string CustomerEmail { get; set; }
    public string Review { get; set; }
  }

  [Route("api/[controller]")]
  public class CustomerReviewController : Controller
  {
    private ProductContext _customerDb;
    private readonly ILogger<CustomerReviewController> _logger;

    public CustomerReviewController(ProductContext customerDb, ILogger<CustomerReviewController> logger)
    {
      _customerDb = customerDb;
      _logger = logger;
    }


    [HttpGet("[action]")]
    public IActionResult GetEmails()
    {
      var customers = _customerDb.Customers;

      if (customers == null) return Ok(new List<CustomersDTOWrapper>());
      var wrapped = new CustomersDTOWrapper { Data = customers.Select(c => c.Email).ToArray() };
      return Ok(wrapped);
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
          .Select(product =>
             new CustomerViewDTO { Product = product, Review = product.Reviews.SingleOrDefault(r => r.CustomerId == customer.CustomerId) }).ToList();
      // Need to wrap this with a data property
      var wrapped = new CustomerViewDTOWrapper { Data = productMapping };
      return Ok(wrapped);
    }

    [HttpPost("[action]")]
    public IActionResult MakeReview([FromBody] ReviewFromCustomer review)
    {
      _logger.LogInformation($"Make Review called with <{review.CustomerEmail}> <{review.ProductId}> <{review.Review}>");
      // SQL update here
      var customer = _customerDb.Customers.SingleOrDefault(c => c.Email == review.CustomerEmail);
      if (customer == null) return StatusCode(500, "Customer Email not found");

      var product = _customerDb.Products.Include(p => p.Reviews).SingleOrDefault(p => p.ProductId == review.ProductId);
      product.Reviews.Add(new Review { CustomerId = customer.CustomerId, Stars = 5 /* TODO: Fix */, Comments = review.Review });
      _customerDb.SaveChanges();
      return Ok(product);
    }
  }
}