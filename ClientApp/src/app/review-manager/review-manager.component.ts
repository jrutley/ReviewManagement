import { ReviewService } from '../review-manager.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-review-manager',
    templateUrl: './review-manager.component.html',
    providers: [ReviewService]
})
export class ReviewManagerComponent {
    sortBy = 'dateFormatted';
    sortOrder = 'desc';
    rowsOnPage = 10;

    public reviews;

    constructor(private reviewService: ReviewService) {
        reviewService.getReviews().subscribe(n => this.reviews = n);
    }
}
