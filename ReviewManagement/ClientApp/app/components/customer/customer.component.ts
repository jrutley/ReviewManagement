import { Component, OnInit } from '@angular/core';
import { ProductViewModel } from './product.viewmodel'
import { CustomerProductService } from '../../services/customer-product.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html',
    providers: [CustomerProductService]
})

export class CustomerComponent extends OnInit {
    public name: string;
    emails: string[];
    email = new FormControl();
    public productsViewModel: ProductViewModel[];

    constructor(private productService: CustomerProductService) { super(); }

    ngOnInit() {
        this.email.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(email => this.productService.getProducts(email).then(p => { this.productsViewModel = p; }));

        this.productService.getAllEmails()
            .then(res => { this.emails = res; })
            .catch(e => console.log(e));
    }
}
