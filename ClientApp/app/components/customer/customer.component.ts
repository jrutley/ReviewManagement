import { Component } from '@angular/core';
import {ProductViewModel} from './product.viewmodel.component'

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html'
})

export class CustomerComponent {
    public name: string;
    public email: string;
    public products: ProductViewModel[];

    public getProducts(){
        //this.products = service.getProducts("ME");
    }
}
