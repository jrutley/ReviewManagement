import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'review-manager',
    templateUrl: './review-manager.component.html'
})
export class ReviewManagerComponent {
    public forecasts: WeatherForecast[];

    constructor(http: Http) {
        http.get('/api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        });
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
