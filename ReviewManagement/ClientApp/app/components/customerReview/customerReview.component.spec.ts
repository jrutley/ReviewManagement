import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerReviewComponent } from './customer-review.component';
import { ProductViewModel } from '../customer/product.viewmodel';
import { CustomerProductService } from '../../services/customer-product.service';
import { Observable } from 'rxjs';

class MockCustomerReviewService {
  then(callback) {
    callback();
    return this;
  }
  makeReview(reviewText, productId, customerEmail) { return this; }
}

describe('customer review', () => {
  let fixture: ComponentFixture<CustomerReviewComponent>;
  const mockProduct = [{ name: "Mock 1", review: "Sucks!" }, { name: "Mock 2", review: "Awesome!" }, { name: "No review" }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomerReviewComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
      // Override component's own provider
      .overrideComponent(CustomerReviewComponent, {
        set: {
          providers: [
            { provide: CustomerProductService, useClass: MockCustomerReviewService }
          ]
        }
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewComponent);
    fixture.componentInstance.product = { id: 1, name: "Spaceballs the video tape", review: "Never play it again" };
    fixture.detectChanges();
  });

  it('should display the product name', () => {
    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.textContent).toContain("Spaceballs the video tape");
  });

  describe('with existing review', () => {
    beforeEach(() => {
      fixture.componentInstance.product = { id: 1, name: "Spaceballs the toilet paper", review: "Nice and smooth" };
      fixture.detectChanges();
    });
    it('should display the review', () => {
      const spans = fixture.debugElement.queryAll(By.css('span'));
      expect(spans[1].nativeElement.textContent).toContain("Nice and smooth");
    });

    it('should not display an Add Review button', () => {
      const divs = fixture.debugElement.queryAll(By.css('div'));
      expect(divs.length).toBe(0);
    });
  })

  describe('with no review', () => {
    beforeEach(() => {
      fixture.componentInstance.product = { id: 1, name: "Spaceballs the t-shirt", review: undefined };
      fixture.detectChanges();
    });

    it('should call "makeReview" when Add Review button is clicked', async(() => {
      fixture.componentInstance.reviewText.setValue("My review");
      fixture.detectChanges();
      const button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      expect(fixture.componentInstance.product.review).toBe(fixture.componentInstance.reviewText.value);
    }));
  });
});