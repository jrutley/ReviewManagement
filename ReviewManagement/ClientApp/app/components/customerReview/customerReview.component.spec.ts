import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerReviewComponent } from './customer-review.component';
import { ProductViewModel } from '../customer/product.viewmodel';
import { CustomerProductService } from '../../services/customer-product.service';
import { Observable } from 'rxjs';

describe('customer review', () => {
  let fixture: ComponentFixture<CustomerReviewComponent>;
  const mockProduct = [{ name: "Mock 1", review: "Sucks!" }, { name: "Mock 2", review: "Awesome!" }, { name: "No review" }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomerReviewComponent
      ],
      imports: [
        //ReactiveFormsModule
      ]
    })
      // Override component's own provider
      .overrideComponent(CustomerReviewComponent, {
        set: {
          providers: [
            //{ provide: CustomerProductService, useClass: MockCustomerProductService }
          ]
        }
      });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewComponent);
    fixture.componentInstance.product = { id: 1, name: "Mock 1", review: "Sucks!" };
    fixture.detectChanges();
  });
})