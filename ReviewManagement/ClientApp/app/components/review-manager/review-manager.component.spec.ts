import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ReviewManagerComponent } from './review-manager.component';
import { CustomerReviewComponent } from '../customerReview/customer-review.component';
import { Observable } from 'rxjs';

const mockProduct = [{ id: 1, name: "Mock 1", review: "Sucks!" }, { id: 2, name: "Mock 2", review: "Awesome!" }, { id: 3, name: "No review" }];

class MockCustomerProductService {
  data;
  error;

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
        //ReactiveFormsModule
      ]
    })
    // Override component's own provider
    // .overrideComponent(CustomerComponent, {
    //     set: {
    //         providers: [
    //             { provide: CustomerProductService, useClass: MockCustomerProductService }
    //         ]
    //     }
    // })
    // .overrideComponent(CustomerReviewComponent, {
    //     set: {
    //         providers: [
    //             { provide: CustomerProductService, useClass: MockCustomerProductService }
    //         ]
    //     }
    // });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewManagerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load all reviews into a table', () => {
    pending();
  })
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
