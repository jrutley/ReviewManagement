using Microsoft.AspNetCore.Mvc;
using ReviewManagement.Models;

namespace ReviewManagement.Controllers
{
    [Route("api/[controller]")]
    public class CustomerReviewController : Controller
    {
        [HttpGet("[action]/{city}")]
        public IActionResult GetProduct(string product)
        {
            return Ok(new { Description = "Shiny"});
        }
        [HttpGet("[action]/{city}")]
        public IActionResult GetProducts(string product)
        {
            var result = new Product[]{};
            // Call SQL here and get products
            return Ok();
        }
    }
}