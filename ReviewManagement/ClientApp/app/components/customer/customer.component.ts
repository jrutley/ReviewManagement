import { Component } from '@angular/core';
import { ProductViewModel } from './product.viewmodel'
import { CustomerProductService } from '../../services/customer-product.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html',
    providers: [CustomerProductService]
})

export class CustomerComponent {
    public name: string;
    email = new FormControl();
    public productsViewModel: ProductViewModel[];

    constructor(private productService: CustomerProductService) {
        let subscription = this.email.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(email => this.productService.getProducts(email).then(p => { this.productsViewModel = p; }));
    }
}
