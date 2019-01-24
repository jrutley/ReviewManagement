using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Controllers.ViewModels;
using Microsoft.Extensions.Logging;

namespace ReviewManagement.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CustomerReviewController : ControllerBase
  {
    private readonly ILogger<CustomerReviewController> _logger;
    private ICustomerProductRepository _repository;

    public CustomerReviewController(ICustomerProductRepository repository, ILogger<CustomerReviewController> logger)
    {
      _repository = repository;
      _logger = logger;
    }


    [HttpGet("[action]")]
    public ActionResult<IEnumerable<string>> GetEmails()
    {
      return Ok(_repository.GetCustomerEmails());
    }


    [HttpGet("[action]")]
    public ActionResult<IEnumerable<CustomerViewDTO>> MyProductsAndReviews([FromQuery] string email) // Don't do this in a real app!
    {
      var customer = _repository.GetFullyLoadedCustomer(email);

      if (customer == null) return Ok(new List<CustomerViewDTO>());
      var productMapping = customer
          .Products
          .Select(cp => cp.Product)
          .Select(product =>
             new CustomerViewDTO { Product = product, Review = product.Reviews.SingleOrDefault(r => r.CustomerId == customer.CustomerId) }).ToList();
      // Need to wrap this with a data property
      return Ok(productMapping);
    }

    [HttpPost]
    public ActionResult MakeReview([FromBody] ReviewFromCustomerDTO review)
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

      return Ok();
    }
  }
}
