import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ReviewService } from './review-manager.service';
import { ReviewManagerComponent } from './review-manager.component';
import { CustomerReviewComponent } from '../customerReview/customer-review.component';
import { DataTableModule } from 'angular2-datatable';
import { Observable } from 'rxjs';
import { Review } from '../../models/review.model';

const mockReview = "Spaceballs the breakfast cereal is the best tasting ever!";
const testDate = new Date(2017, 3, 1, 17, 15, 15).toDateString();

class ReviewServiceStub {
  data;
  error;

  getReviews(): Observable<Review[]> {
    return Observable.of([
      {
        stars: 5,
        comments: mockReview,
        customerEmail: "1@spaceballs.com",
        dateTime: testDate,
        state: "New",
        product: "Item 1"
      },
      {
        stars: 4,
        comments: mockReview,
        customerEmail: "2@spaceballs.com",
        dateTime: testDate,
        state: "New",
        product: "Item 2"
      },
      {
        stars: 3,
        comments: mockReview,
        customerEmail: "3@spaceballs.com",
        dateTime: testDate,
        state: "New",
        product: "Item 3"
      },
      {
        stars: 2,
        comments: mockReview,
        customerEmail: "4@spaceballs.com",
        dateTime: testDate,
        state: "Reviewed",
        product: "Item 4"
      }
    ])
  }

  then(callback) {
    if (!this.error) {
      callback(this.data);
    }
    return this;
  }
  catch(callback) {
    return this;
  }
}

describe('Review component', () => {
  let fixture: ComponentFixture<ReviewManagerComponent>;
  let comp: ReviewManagerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReviewManagerComponent
      ],
      imports: [
        DataTableModule
      ]
    })
      // Override component's own provider
      .overrideComponent(ReviewManagerComponent, {
        set: {
          providers: [
            { provide: ReviewService, useClass: ReviewServiceStub }
          ]
        }
      })
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewManagerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges(); // on load it will have already imported the data from the service
  });

  it('should load all reviews into a table', () => {
    // Get an item on the page
    const columns = fixture.debugElement.queryAll(By.css('td'));
    expect(columns[0].nativeElement.textContent).toBe("1@spaceballs.com");
    expect(columns[1].nativeElement.textContent).toBe("Item 1");
    expect(columns[2].nativeElement.textContent).toBe(testDate.toString())
  })
  it('should only load the first 3 reviews', () => {
    fixture.componentInstance.rowsOnPage = 3;
    fixture.detectChanges();
    const columns = fixture.debugElement.nativeElement.querySelectorAll('tbody td');

    expect(columns.length).toBe(18); // Review has 6 properties... x 3
  })
});
