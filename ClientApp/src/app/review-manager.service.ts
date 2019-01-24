import { Review } from './models/review.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewService {
  private rootUrl = 'api/Review/';
  private makeReviewUrl = this.rootUrl + 'AllReviews';

  reviews: Observable<Review[]>;

  constructor(private http: HttpClient) { }

  getReviews(): Observable<Review[]> {
    return this.http
      .get<Review[]>(this.makeReviewUrl);
  }
}
