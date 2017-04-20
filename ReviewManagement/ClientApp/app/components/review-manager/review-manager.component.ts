import { ReviewService } from './review-manager.service';
import { Component } from '@angular/core';
import { Review } from '../../services/product.model';

@Component({
    selector: 'review-manager',
    templateUrl: './review-manager.component.html',
    providers: [ReviewService]
})
export class ReviewManagerComponent {
    sortBy = "dateFormatted";
    sortOrder = "desc";
    rowsOnPage = 2;

    public reviews = {
        customer: "Hi",
        datetime: new Date(),
        stars: 5,
        comments: "Foo",
        state: 1
    };


    constructor(private reviewService: ReviewService) {

        //reviewService.getReviews().subscribe(n => this.reviews = n)
    }
}


