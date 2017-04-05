import { Component } from '@angular/core';
import { ProductViewModel } from './product.viewmodel.component'
import { CustomerProductService } from '../../services/customer-product.service';

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html',
    providers: [CustomerProductService]
})

export class CustomerComponent {
    public name: string;
    public email: string;
    public products: ProductViewModel[];

    constructor(private productService: CustomerProductService) { }

    public updateProducts() {
        console.log("UPDATE PRODUCTS");
        this.getProducts();
    }

    public getProducts() {
        this.productService.getProducts("ME").then(p => {
            this.products = p;
            console.log("GOT PRODUCT");
            console.log(this.products);
            return this.products;
        });
    }
}
