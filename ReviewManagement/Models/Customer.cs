using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReviewManagement.Models
{
  public class Customer
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CustomerId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public ICollection<CustomerProduct> Products { get; set; }
  }
}