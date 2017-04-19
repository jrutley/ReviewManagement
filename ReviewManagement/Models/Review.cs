using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace ReviewManagement.Models
{
  public enum ReviewStateEnum
  {
    New,
    Reviewed,
    Answered
  }
  public class Review
  {
    public int CustomerId { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ReviewId { get; set; }

    public int Stars { get; set; }

    public string Comments { get; set; }

    public DateTimeOffset DateTime { get; set; }

    public ReviewStateEnum State { get; set; }
  }
}
