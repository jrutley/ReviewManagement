using System;
class NotFoundException : Exception
{
  public NotFoundException(string email) : base(email) { }
}