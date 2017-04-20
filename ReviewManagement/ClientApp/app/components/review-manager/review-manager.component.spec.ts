import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ReviewService } from './review-manager.service';
import { ReviewManagerComponent } from './review-manager.component';
import { CustomerReviewComponent } from '../customerReview/customer-review.component';
import { DataTableModule } from 'angular2-datatable';
import { Observable } from 'rxjs';

const mockProduct = [{ id: 1, name: "Mock 1", review: "Sucks!" }, { id: 2, name: "Mock 2", review: "Awesome!" }, { id: 3, name: "No review" }];
const mockReview = "Spaceballs the breakfast cereal is the best tasting ever!";

class ReviewServiceStub {
  data;
  error;

  getReviews() {
    console.log("Get reviews!!!");
    return Observable.of([{
      stars: 5,
      comments: mockReview,
      customer: "helmet@spaceballs.com",
      datetime: new Date(),
      state: 1
    }])
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
  let de: DebugElement;
  let el: HTMLInputElement;

  beforeAll(() => {
    // Monkey-patch Observable.debounceTime() since it is using
    // setInterval() internally which not allowed within async zone
    Observable.prototype.debounceTime = function () { return this; };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReviewManagerComponent
      ],
      imports: [
        DataTableModule
        //ReactiveFormsModule
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

  it('should load all reviews into a table', async(() => {
    // Get an item on the page
    const columns = fixture.debugElement.queryAll(By.css('td'));
    expect(columns[0].nativeElement.textContent).toBe("helmet@spaceballs.com");

    //expect().toBe(mockReview);
  }))
  it('should only load the first 10 reviews', () => {
    pending();
  })
  it('should paginate all reviews', () => {
    pending();
  })
  it('should allow the reviews to be sorted', () => {
    pending();
  })
});
