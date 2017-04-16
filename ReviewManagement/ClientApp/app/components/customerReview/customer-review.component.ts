import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../customer/product.viewmodel';
import { CustomerProductService } from '../../services/customer-product.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'cus-review',
  templateUrl: './customer-review.component.html',
  providers: [CustomerProductService]
})

export class CustomerReviewComponent {
  form: FormGroup;
  @Input() product: ProductViewModel;
  @Input() customerEmail: string; // User's e-mail
  reviewText = new FormControl("", Validators.required);

  constructor(private productService: CustomerProductService, fb: FormBuilder) {
    this.form = fb.group({
      "reviewText": this.reviewText
    });
  }

  onSubmit() {
    console.log(this.reviewText.value);
    this.productService.makeReview(this.reviewText.value, this.product.id, this.customerEmail)
      .then(() => {
        this.product.review = this.reviewText.value;
      })
  };
}