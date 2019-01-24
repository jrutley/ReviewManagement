import { Component, OnInit } from '@angular/core';
import { ProductViewModel } from './product.viewmodel';
import { CustomerProductService } from '../customer-product.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  providers: [CustomerProductService]
})

export class CustomerComponent implements OnInit {
  public name: string;
  emails: string[];
  email = new FormControl();
  matchingEmail = false;
  public productsViewModel: ProductViewModel[];

  constructor(private productService: CustomerProductService) { }

  ngOnInit() {
    this.email.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(email => {
        this.matchingEmail = this.emails.find(e => e === email) !== undefined;
        return this.productService.getProducts(email).subscribe(p => {
          this.productsViewModel = p;
        });
      });

    this.productService.getAllEmails().subscribe(res => { this.emails = res; },
      e => console.log(e),
      () => console.log('customer sub completed'));
  }
}
