/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { CustomerComponent } from './customer.component';
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductViewModel } from './product.viewmodel.component';
import { By } from '@angular/platform-browser';
import { CustomerProductService } from '../../services/customer-product.service';
import { DebugElement } from '@angular/core';

class MockCustomerProductService {
    getProducts(st: string): Promise<ProductViewModel> {
        console.log("MOCK PRODUCT SERVICE");
        const mockProduct = { products: ["Mock 1", "Mock 2"] };
        return Promise.resolve(mockProduct);
    }
}

describe('Customer component', () => {
    let fixture: ComponentFixture<CustomerComponent>;
    let comp: CustomerComponent;
    let de: DebugElement;
    let el: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CustomerComponent
            ],
            imports: [
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

    it('should use the mocked service', async(() => {
        comp.getProducts().then(p => {
            expect(p).toContain("Mock 1");
        });
    }));

    it('should bind the input to the correct property', () => {
        let input = fixture.debugElement.query(By.css('input'));
        let inputElement = input.nativeElement;

        //set input value
        inputElement.value = 'test value';
        inputElement.dispatchEvent(new Event('input'));

        expect(fixture.componentInstance.name).toBe('test value'); // Test [(ngModel)]="name"
    });

    it('should display purchased products after name is entered', fakeAsync(() => {

        // Add entered email
        de = fixture.debugElement.query(By.css('input'));
        el = de.nativeElement;
        el.value = "Hi";
        el.dispatchEvent(new Event('input'));
        tick();
        fixture.detectChanges();

        const products = fixture.debugElement.queryAll(By.css('li'));
        console.log(products);
        expect(products.length).toBeGreaterThan(0);
    }));

    // it('should start with count 0, then increments by 1 when clicked', async(() => {
    //     const countElement = fixture.nativeElement.querySelector('strong');
    //     expect(countElement.textContent).toEqual('0');

    //     const incrementButton = fixture.nativeElement.querySelector('button');
    //     incrementButton.click();
    //     fixture.detectChanges();
    //     expect(countElement.textContent).toEqual('1');
    // }));
});
