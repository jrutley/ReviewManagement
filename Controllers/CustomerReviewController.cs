using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Models;

namespace ReviewManagement.Controllers
{
    [Route("api/[controller]")]
    public class CustomerReviewController : Controller
    {
        private ProductContext _productDb;

        public CustomerReviewController(ProductContext productDb){
            _productDb = productDb;
        }
        [HttpGet("[action]/{city}")]
        public IActionResult GetProduct(string product)
        {
            return Ok(new { Description = "Shiny"});
        }
        [HttpGet("[action]/{city}")]
        public IActionResult GetProducts(string product)
        {
            // Call SQL here and get products
            return Ok(_productDb.Products.ToList());
        }
    }
}