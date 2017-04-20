import { Review } from '../../services/product.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ReviewService {
  getReviews(): Observable<Review[]> {
    let reviews = [{
      customer: "Hi",
      datetime: 'now',
      stars: 5,
      comments: "Foo",
      state: 1
    }];
    return Observable.of(reviews);
  }
}