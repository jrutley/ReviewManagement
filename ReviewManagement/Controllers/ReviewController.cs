using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Controllers.ViewModels;
using Microsoft.Extensions.Logging;

namespace ReviewManagement.Controllers
{

  [Route("api/[controller]")]
  public class ReviewController : Controller
  {
    private readonly ILogger<ReviewController> _logger;
    private IReviewRepository _repository;

    public ReviewController(IReviewRepository repository, ILogger<ReviewController> logger)
    {
      _repository = repository;
      _logger = logger;
    }


    [HttpGet("[action]")]
    public IActionResult AllReviews()
    {
      var productsAndReviews = _repository.GetProductsWithAllReviews();
      var customers = _repository.GetCustomers().ToDictionary(id => id.CustomerId);

      var reviews = new List<ReviewsDTO>();
      // TODO: Refactor to LINQ
      foreach (var product in productsAndReviews)
      {
        foreach (var review in product.Reviews)
        {
          reviews.Add(new ReviewsDTO
          {
            Product = product.Name,
            CustomerEmail = customers[review.CustomerId].Email,
            Stars = review.Stars,
            Comments = review.Comments,
            DateTime = review.DateTime.ToString(),
            State = review.State.ToString()
          });
        }
      }

      var wrapped = new ReviewDTOWrapper { Data = reviews };
      return Ok(wrapped);
    }
  }
}
