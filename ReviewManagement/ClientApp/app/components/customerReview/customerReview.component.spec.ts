import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerReviewComponent } from './customer-review.component';
import { ProductViewModel } from '../customer/product.viewmodel';
import { CustomerProductService } from '../../services/customer-product.service';
import { Observable } from 'rxjs';

class MockCustomerReviewService { }

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
  })



  it('should display the customer\'s existing reviews for that', fakeAsync(() => {
    // const products = fixture.debugElement.queryAll(By.css('.customer-product'));
    // expect(products.length).toBeGreaterThan(0);
    // expect(products[0].nativeElement.textContent).toContain('Mock 1');
  }));
  it('should display an Add Review button when no review exists', () => {
    // const button = fixture.debugElement.query(By.css('button'));
    // expect(button.parent.children.find(el => el.nativeElement.textContent === 'No review'))
  });

  it('should not display an Add Review button when a review exists', () => {
    // const products = fixture.debugElement.queryAll(By.css('li'));
    // console.log(products);
    // expect(products[0].query(By.css('button'))).toBe(null);
  });
})