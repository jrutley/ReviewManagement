import { ProductViewModel } from '../components/customer/product.viewmodel';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerProductService {
    private rootUrl = 'api/CustomerReview/';
    private emailsUrl = this.rootUrl + 'GetEmails'
    private productUrl = this.rootUrl + 'MyProductsAndReviews';
    private makeReviewUrl = this.rootUrl + 'MakeReview';

    constructor(private http: Http) { }

    getAllEmails(): Promise<string[]> {
        return this.http.get(this.emailsUrl)
            .toPromise()
            .then(this.extractEmails)
            .catch(e => { return ["Sorry, an error occurred"] });
    }

    private extractEmails(res: Response): string[] {
        return res.json().data || [];
    }

    makeReview(review: string, productId: number, customerEmail: string) {
        return this.http.post(this.makeReviewUrl, { productId: productId, customerEmail: customerEmail, review: review })
            .toPromise()
            .catch(this.handleError);
    }

    getProducts(email: string): Promise<ProductViewModel[]> {
        return this.http.get(this.productUrl + '?email=' + email) // Don't use a GET in a query string in a production app!
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response): ProductViewModel[] {
        let body = res.json().data || [];
        return body.map(p => {
            return {
                id: p.product.productId,
                name: p.product.name,
                review: p.review ? p.review.comments : undefined
            }
        });
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
