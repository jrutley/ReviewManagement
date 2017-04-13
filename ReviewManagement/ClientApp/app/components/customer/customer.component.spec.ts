/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerComponent } from './customer.component';
import { ProductViewModel } from './product.viewmodel';
import { CustomerProductService } from '../../services/customer-product.service';
import { Observable } from 'rxjs';

class MockCustomerProductService {
    getProducts(st: string): Promise<ProductViewModel[]> {
        const mockProduct = [{ name: "Mock 1", review: "Sucks!" }, { name: "Mock 2", review: "Awesome!" }];
        return Promise.resolve(mockProduct);
    };
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
                CustomerComponent
            ],
            imports: [
                ReactiveFormsModule
            ]
        })
            // Override component's own provider
            .overrideComponent(CustomerComponent, {
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

    it('should display a title', async(() => {
        const titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Customer');
    }));

    it('should bind the input to the correct property', () => {
        let input = fixture.debugElement.query(By.css('input'));
        let inputElement = input.nativeElement;

        //set input value
        inputElement.value = 'test value';
        inputElement.dispatchEvent(new Event('input'));

        expect(fixture.componentInstance.email.value).toBe('test value');
    });

    it('should display purchased products after email is entered', fakeAsync(() => {

        // Add entered email
        de = fixture.debugElement.query(By.css('input'));
        el = de.nativeElement;
        el.value = "Hi";
        el.dispatchEvent(new Event('input'));
        tick();
        fixture.detectChanges();

        const products = fixture.debugElement.queryAll(By.css('li'));
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].nativeElement.textContent).toContain('Product: Mock 1 Review: Sucks!');
    }));

    it('should display the customer\'s existing reviews for that after email is entered', fakeAsync(() => {

        // Add entered email
        de = fixture.debugElement.query(By.css('input'));
        el = de.nativeElement;
        el.value = "Hi";
        el.dispatchEvent(new Event('input'));
        tick();
        fixture.detectChanges();

        const products = fixture.debugElement.queryAll(By.css('li'));
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].nativeElement.textContent).toContain('Mock 1');
    }));

    it('should display Add Review on the button when no review exists', () => {
        pending();
    });
    it('should display Edit Review on the button when a review exists', () => {
        pending();
    })

});
