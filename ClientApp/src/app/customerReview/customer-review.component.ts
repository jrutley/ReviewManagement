import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../customer/product.viewmodel';
import { CustomerProductService } from '../customer-product.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  providers: [CustomerProductService]
})

export class CustomerReviewComponent {
  form: FormGroup;
  @Input() product: ProductViewModel;
  @Input() customerEmail: string; // User's e-mail
  reviewText = new FormControl('', Validators.required);

  constructor(private productService: CustomerProductService, fb: FormBuilder) {
    this.form = fb.group({
      'reviewText': this.reviewText
    });
  }

  onSubmit() {
    this.productService.makeReview(this.reviewText.value, this.product.id, this.customerEmail)
      .subscribe(() => {
        this.product.review = this.reviewText.value;
      },
        e => console.log(`Error: ${e}`)
      );
  }
}
