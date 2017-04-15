import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../customer/product.viewmodel';

@Component({
  selector: 'cus-review',
  templateUrl: './customer-review.component.html'
})

export class CustomerReviewComponent {
  @Input() product: ProductViewModel;

  addReview() {
    console.log("TODO");
  }
}