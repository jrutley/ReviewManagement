import { Review } from '../../services/product.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ReviewService {
  getReviews(): Observable<Review[]> {
    let review = new Review();
    review.comments = "foo";
    review.stars = 4;
    return Observable.of([review]);
  }
}