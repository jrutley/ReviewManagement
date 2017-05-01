using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Controllers;
using ReviewManagement.Controllers.ViewModels;
using Xunit;
using Moq;
using Microsoft.Extensions.Logging;
using ReviewManagement.Models;
using System.Linq;

namespace ReviewManagement.Test
{
  public class CustomerReviewControllerShould
  {
    private readonly CustomerReviewController _controller;
    Mock<ICustomerProductRepository> _customerProductRepository;

    public CustomerReviewControllerShould()
    {
      _customerProductRepository = new Mock<ICustomerProductRepository>();

      _controller = new CustomerReviewController(_customerProductRepository.Object, new Mock<ILogger<CustomerReviewController>>().Object);
    }

    [Fact]
    public void ReturnEmptyIfNotFound()
    {
      var call = _controller.MyProductsAndReviews("lonestar@lonestar.com");
      var okResult = Assert.IsType<OkObjectResult>(call);
      var reviews = okResult.Value as CustomerViewDTOWrapper;
      Assert.Null(reviews.Data);
    }

    [Fact]
    public void ReturnNoDataIfCustomerHasNoReviews()
    {
        var customerName = "lonestar@lonestar.com";
            var customer = new Customer { Email = customerName, Name = "Lone Star", Products = new List<CustomerProduct>() };
            _customerProductRepository.Setup(cpr => cpr.GetFullyLoadedCustomer(customerName)).Returns(customer);
        var call = _controller.MyProductsAndReviews(customerName);
        var okResult = Assert.IsType<OkObjectResult>(call);
        var reviews = okResult.Value as CustomerViewDTOWrapper;
        Assert.Empty(reviews.Data);
    }

        [Fact]
        public void ReturnProductIfCustomerHasReviewedAProduct()
        {
            var customerName = "lonestar@lonestar.com";
            var productName = "Spaceballs, the underwear";

            var product = new Product { Name = productName, Reviews = new List<Review>() };
            var customer = new Customer { Email = customerName, Name = "Lone Star"};
            customer.Products = new List<CustomerProduct> { new CustomerProduct { Product = product, ProductId = product.ProductId, Customer = customer, CustomerId = customer.CustomerId} };
            _customerProductRepository.Setup(cpr => cpr.GetFullyLoadedCustomer(customerName)).Returns(customer);
            var call = _controller.MyProductsAndReviews(customerName);
            var okResult = Assert.IsType<OkObjectResult>(call);
            var reviews = okResult.Value as CustomerViewDTOWrapper;

            Assert.Same(reviews.Data.First().Product.Name, productName);
        }
    }
}

