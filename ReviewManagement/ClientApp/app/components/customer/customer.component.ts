import { Component } from '@angular/core';
import { ProductViewModel } from './product.viewmodel'
import { CustomerProductService } from '../../services/customer-product.service';

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html',
    providers: [CustomerProductService]
})

export class CustomerComponent {
    public name: string;
    public email: string;
    public productViewModel: ProductViewModel[];

    constructor(private productService: CustomerProductService) { }

    public updateProducts() {
        this.getProducts();
    }

    public getProducts() {
        return this.productService.getProducts(this.email).then(p => {
            this.productViewModel = p;
            return this.productViewModel;
        });
    }
}
