using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReviewManagement.Controllers;
using ReviewManagement.Controllers.ViewModels;
using ReviewManagement.Models;
using Xunit;

namespace ReviewManagement.Test
{
  public class CustomerReviewControllerShould
  {
    private readonly CustomerReviewController _controller;
    private ProductContext _dbContext;

    public CustomerReviewControllerShould()
    {
      var optionsBuilder = new DbContextOptionsBuilder<ProductContext>();
      optionsBuilder.UseInMemoryDatabase();
      _dbContext = new ProductContext(optionsBuilder.Options);
      _dbContext.Customers.Add(new Customer { Name = "Dark Helmet", Email = "helmet@spaceballs.com" });

      _controller = new CustomerReviewController(_dbContext);
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

