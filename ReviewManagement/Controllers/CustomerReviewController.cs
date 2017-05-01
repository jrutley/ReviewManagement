using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Controllers.ViewModels;
using Microsoft.Extensions.Logging;

namespace ReviewManagement.Controllers
{

  [Route("api/[controller]")]
  public class CustomerReviewController : Controller
  {
    private readonly ILogger<CustomerReviewController> _logger;
    private ICustomerProductRepository _repository;

    public CustomerReviewController(ICustomerProductRepository repository, ILogger<CustomerReviewController> logger)
    {
      _repository = repository;
      _logger = logger;
    }


    [HttpGet("[action]")]
    public IActionResult GetEmails()
    {
      var wrapped = new CustomersDTOWrapper { Data = _repository.GetCustomerEmails() };
      return Ok(wrapped);
    }


    [HttpGet("[action]")]
    public IActionResult MyProductsAndReviews([FromQuery] string email) // Don't do this in a real app!
    {
      var customer = _repository.GetFullyLoadedCustomer(email);

      if (customer == null) return Ok(new CustomerViewDTOWrapper());
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
    public IActionResult MakeReview([FromBody] ReviewFromCustomerDTO review)
    {
      _logger.LogInformation($"Make Review called with <{review.CustomerEmail}> <{review.ProductId}> <{review.Review}>");
      // SQL update here

      try
      {
        _repository.AddReviewForCustomer(review);
      }
      catch (NotFoundException)
      {
        return StatusCode(500, "Customer Email not found");
      }

      return Ok(review);
    }
  }
}
