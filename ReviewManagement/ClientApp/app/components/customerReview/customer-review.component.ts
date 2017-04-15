import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../customer/product.viewmodel';
import { FormControl } from '@angular/forms';
import { CustomerProductService } from '../../services/customer-product.service';

@Component({
  selector: 'cus-review',
  templateUrl: './customer-review.component.html',
  providers: [CustomerProductService]
})

export class CustomerReviewComponent {
  @Input() product: ProductViewModel;
  @Input() customerEmail: string; // User's e-mail
  reviewText: string;

  constructor(private productService: CustomerProductService) { }

  addReview() {
    this.productService.makeReview(this.reviewText, this.product.name, this.customerEmail);
  }
}