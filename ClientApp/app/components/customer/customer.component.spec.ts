/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { CustomerComponent } from './customer.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductViewModel } from './product.viewmodel.component';
import { By } from '@angular/platform-browser';
import { CustomerProductService } from '../../services/customer-product.service';
import {PRODUCTS} from '../../services/product.mock';

class MockCustomerProductService {
    public myProducts: ProductViewModel[] = PRODUCTS
    getProducts(): Promise<ProductViewModel[]> {
        console.log("MOCK PRODUCT SERVICE");
        return Promise.resolve(PRODUCTS);
    }
}

let fixture: ComponentFixture<CustomerComponent>;

describe('Customer component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ 
            declarations: [CustomerComponent], 
            imports: [FormsModule],
            providers: [{provide: CustomerProductService, useClass: MockCustomerProductService}]
        });
        fixture = TestBed.createComponent(CustomerComponent);
        fixture.detectChanges();
    });

    it('should display a title', async(() => {
        const titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Customer');
    }));

    it('after email is entered, display purchased products', async(() => {

        // Add entered email
        const nameInput = fixture.debugElement.query(By.css('input'));
        let el = nameInput.nativeElement;
        el.value = 'me@email.com';
        el.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Debounce???
        // Call the service
        // Filter on products previously purchased
        // Return the products
        fixture.whenStable().then(()=>{
            fixture.componentInstance.getProducts();
            fixture.detectChanges();
            fixture.whenStable().then(()=>{
                console.log("PRoducts:");
                console.log(fixture.componentInstance.products);
                console.log(fixture.debugElement);
                const products = fixture.debugElement.queryAll(By.css('customer-product'));
                console.log(products);
                //const products = fixture.debugElement.queryAll(By.css('li'));
                expect(products.length).toBeGreaterThan(0);
            });
        });
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
