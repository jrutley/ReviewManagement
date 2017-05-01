using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Controllers;
using ReviewManagement.Controllers.ViewModels;
using Xunit;
using Moq;
using Microsoft.Extensions.Logging;

namespace ReviewManagement.Test
{
  public class CustomerReviewControllerShould
  {
    private readonly CustomerReviewController _controller;

    public CustomerReviewControllerShould()
    {
     var customerProductRepository = new Mock<ICustomerProductRepository>();

      _controller = new CustomerReviewController(customerProductRepository.Object, new Mock<ILogger<CustomerReviewController>>().Object);
    }

    [Fact]
    public void ReturnEmptyIfNotFound()
    {
      var call = _controller.MyProductsAndReviews("lonestar@lonestar.com");
      var okResult = Assert.IsType<OkObjectResult>(call);
      var reviews = okResult.Value as IEnumerable<CustomerViewDTO>;
      Assert.Empty(reviews);
    }
  }
}

