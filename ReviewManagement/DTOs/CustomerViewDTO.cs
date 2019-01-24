using ReviewManagement.Models;
using System.Collections.Generic;

namespace ReviewManagement.Controllers.ViewModels
{
  public class CustomerViewDTO
  {
    public Product Product { get; set; }
    public Review Review { get; set; }
  }
}