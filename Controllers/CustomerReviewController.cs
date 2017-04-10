using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Models;

namespace ReviewManagement.Controllers
{
    [Route("api/[controller]")]
    public class CustomerReviewController : Controller
    {
        private ProductContext _customerDb;

        public CustomerReviewController(ProductContext customerDb){
            _customerDb = customerDb;
        }
        [HttpGet("[action]/{product}")]
        public IActionResult GetProduct(string product)
        {
            return Ok(new { Description = "Shiny"});
        }
        [HttpGet("[action]")]
        public IActionResult MyProductsAndReviews([FromQuery] string email) // Don't do this in a real app!
        {
            var customer = _customerDb.Customers.Single(c => c.Email == email);
            var productMapping = customer.Products.Select(p => { return new { Product = p, Review = p.Product.Reviews.SingleOrDefault(r => r.CustomerId == customer.CustomerId) }; }).ToList();
            return Ok(productMapping);
        }
    }
}