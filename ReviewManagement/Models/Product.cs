using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReviewManagement.Models
{
  public class Product
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public ICollection<Review> Reviews { get; set; }
  }
}