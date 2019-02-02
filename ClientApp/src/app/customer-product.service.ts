import { ProductViewModel } from './customer/product.viewmodel';
import { CustomerViewDTO } from './models/review.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CustomerProductService {
    private rootUrl = 'api/customerreview/';
    private emailsUrl = this.rootUrl + 'getemails';
    private productUrl = this.rootUrl + 'myproductsandreviews';
    private makeReviewUrl = this.rootUrl + 'makereview';

    constructor(private http: HttpClient) { }

    getAllEmails(): Observable<string[]> {
        return this.http.get<string[]>(this.emailsUrl);
    }

    makeReview(review: string, productId: number, customerEmail: string) {
        return this.http.post(this.makeReviewUrl, { productId: productId, customerEmail: customerEmail, review: review });
    }

    getProducts(email: string): Observable<ProductViewModel[]> {
      // Don't use a GET in a query string in a production app!
      const custView = this.http.get<CustomerViewDTO[]>(this.productUrl + '?email=' + email);
      return this.extractData(custView)
            .pipe(catchError(this.handleError('getProducts', [])));
    }

    private extractData(body: Observable<CustomerViewDTO[]>): Observable<ProductViewModel[]> {
        return body
          .pipe(map(viewModel =>
            viewModel.map(c =>
              new ProductViewModel(c.product.productId,
                c.product.name,
                c.review ? c.review.comments : undefined
          ))));
    }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
