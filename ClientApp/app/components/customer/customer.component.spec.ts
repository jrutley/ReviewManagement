/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { CustomerComponent } from './customer.component';
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductViewModel } from './product.viewmodel.component';
import { By } from '@angular/platform-browser';
import { CustomerProductService } from '../../services/customer-product.service';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
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
            //expect(p.products).toContain("Mock 1");
            expect(p).toContain("Mock 1");
        });
    }));

    it('after email is entered, display purchased products', fakeAsync(() => {

        // Add entered email
        de = fixture.debugElement.query(By.css('input'));

        el = de.nativeElement;
        el.value = 'me@email.com';
        dispatchEvent(el, 'change');
        fixture.detectChanges();

        console.log("El value");
        console.log(el.value);
        console.log("End of el value")
        // Debounce???
        // Call the service
        // Filter on products previously purchased
        // Return the products

        comp.name = "Hi";

        comp.getProducts();
        dispatchEvent(el, 'change');
        dispatchEvent(el, 'blur');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        console.log("Products:");
        console.log(comp.products);
        console.log(fixture.debugElement);
        // const products = fixture.debugElement.queryAll(By.css('.customer-product'));
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
