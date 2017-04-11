using ReviewManagement.Models;

namespace ReviewManagement.Controllers.ViewModels
{
  public class CustomerViewDTO
  {
    public Product Product { get; set; }
    public Review Review { get; set; }
  }
}