namespace ReviewManagement.Controllers
{
  public class ReviewFromCustomerDTO
  {
    public int ProductId { get; set; }
    public string CustomerEmail { get; set; }
    public string Review { get; set; }
    public int Stars { get; set; }
  }
}
