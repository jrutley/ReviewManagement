import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'review-manager',
    templateUrl: './review-manager.component.html'
})
export class ReviewManagerComponent {
    sortBy = "dateFormatted";
    sortOrder = "desc";
    rowsOnPage = 2;

    public reviews;


    constructor(http: Http) {
        // http.get('/api/SampleData/WeatherForecasts').subscribe(result => {
        //     this.forecasts = result.json()// as WeatherForecast[];
        // });

    }
}


