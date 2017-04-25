import { Review } from '../../models/review.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ReviewService {
  private rootUrl = 'api/Review/';
  private makeReviewUrl = this.rootUrl + 'AllReviews';

  reviews: Observable<Review[]>;

  constructor(private http: Http) { }

  getReviews(): Observable<Review[]> {
    return this.http
      .get(this.makeReviewUrl)
      .flatMap(response => Observable.of(response.json().data || []));
  }
}