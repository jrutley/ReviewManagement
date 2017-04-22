import { Review } from '../../services/product.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ReviewService {
  private rootUrl = 'api/ReviewManagement/';
  private makeReviewUrl = this.rootUrl + 'GetReviews';

  constructor(private http: Http) { }
  getReviews(): Observable<Review[]> {

    let reviews = [{
      customerEmail: "frank@sp.com",
      product: "Doll",
      stars: 5,
      comments: "Foo",
      dateTime: new Date().toDateString(),
      state: "Reviewed"
    }];
    return Observable.of(reviews);
  }
}