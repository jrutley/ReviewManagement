using System.Collections.Generic;

namespace ReviewManagement.Controllers.ViewModels
{
  public class ReviewsDTO
  {
    public string CustomerEmail { get; set; }

    public string Product { get; set; } // Perhaps this should link to a product?
    public int Stars { get; set; }

    public string Comments { get; set; }

    public string DateTime { get; set; }

    public string State { get; set; }
  }
  public class ReviewDTOWrapper
  {
    public IEnumerable<ReviewsDTO> Data { get; set; }
  }
}
