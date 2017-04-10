import { ProductViewModel } from '../components/customer/product.viewmodel.component';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerProductService {
    private productUrl = '/api/CustomerReview/MyProductsAndReviews';

    constructor(private http: Http) { }

    getProducts(customerName: string): Promise<ProductViewModel> {
        return this.http.get(this.productUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response): ProductViewModel {
        console.log('successfully extracted')
        let body = res.json();
        let viewModel = new ProductViewModel(body.data.map(p => p.name));
        console.log(viewModel);
        return viewModel || { products: [] };
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
