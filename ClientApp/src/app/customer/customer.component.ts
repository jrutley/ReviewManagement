import { Component, OnInit } from '@angular/core';
import { ProductViewModel } from './product.viewmodel';
import { CustomerProductService } from '../customer-product.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(email => this.emails.find(e => e === email)),
        switchMap(email => {
          this.matchingEmail = email !== undefined;
          // Only call this if matchingEmail is success
          if (this.matchingEmail) {
            return this.productService.getProducts(email);
          }
          return of([]);
      }))
      .subscribe(p => {
        this.productsViewModel = p;
      });

    this.productService.getAllEmails().subscribe(res => { this.emails = res; },
      e => console.log(e));
  }
}
