/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CustomerComponent } from './customer.component';
import { CustomerReviewComponent } from '../customerReview/customer-review.component';
import { ProductViewModel } from './product.viewmodel';
import { CustomerProductService } from '../../services/customer-product.service';
import { Observable } from 'rxjs';

const mockProduct = [{ id: 1, name: "Mock 1", review: "Sucks!" }, { id: 2, name: "Mock 2", review: "Awesome!" }, { id: 3, name: "No review" }];

class MockCustomerProductService {
    data;
    error;

    getProducts(st: string): Promise<ProductViewModel[]> {
        return Promise.resolve(mockProduct);
    };
    getAllEmails() {
        this.data = ['email@email.com'];
        return this;
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

describe('Customer component', () => {
    let fixture: ComponentFixture<CustomerComponent>;
    let comp: CustomerComponent;
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
                CustomerComponent,
                CustomerReviewComponent
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule
            ]
        })
            // Override component's own provider
            .overrideComponent(CustomerComponent, {
                set: {
                    providers: [
                        { provide: CustomerProductService, useClass: MockCustomerProductService }
                    ]
                }
            })
            .overrideComponent(CustomerReviewComponent, {
                set: {
                    providers: [
                        { provide: CustomerProductService, useClass: MockCustomerProductService }
                    ]
                }
            });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should display a title', () => {
        const titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Customer');
    });

    it('should bind the input to the correct property', () => {
        let input = fixture.debugElement.query(By.css('input'));
        let inputElement = input.nativeElement;

        //set input value
        inputElement.value = 'test value';
        inputElement.dispatchEvent(new Event('input'));

        expect(fixture.componentInstance.email.value).toBe('test value');
    });

    describe('on page load', () => {
        it('getAllEmails is called', () => {
            let emails = fixture.componentInstance.emails;
            expect(emails[0]).toBe('email@email.com')
        });
    })

    describe('after email is entered', () => {
        let de: DebugElement;
        let el: HTMLInputElement;
        let productToReview: DebugElement;
        let productViewModel: DebugElement;

        beforeEach(fakeAsync(() => {
            de = fixture.debugElement.query(By.css('input'));
            el = de.nativeElement;
            el.value = "Hi";
            el.dispatchEvent(new Event('input'));
            tick();
            fixture.detectChanges();

            productToReview = fixture.debugElement.query(By.css('#selectAProduct'));
            productViewModel = fixture.debugElement.query(By.css('#productViewModel'));
        }));

        describe('and email is found', () => {

        });
        describe('and email is not found', () => {
            it('should not try to load products', () => {
                console.log("TO REVIEW:");
                console.log(productToReview);
                console.log("VIEWMODEL:");
                console.log(productViewModel);
            })
        });
    });
});
