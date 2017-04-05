import { ProductViewModel } from '../components/customer/product.viewmodel.component';
import { PRODUCTS } from "./product.mock";
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerProductService {
    getProducts(email: string): Promise<ProductViewModel> {
        //throw Error("Not implemented yet");
        console.log("Calling real CustomerProductService");
        console.log(PRODUCTS);
        return Promise.resolve(PRODUCTS);
    }
}
