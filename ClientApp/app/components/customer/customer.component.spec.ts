/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { CustomerComponent } from './customer.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductViewModel } from './product.viewmodel.component';
import { By } from '@angular/platform-browser';

const PRODUCTS = [
    {name: "Luke's lightsaber"},
    {name: "Leia's hair earmuffs"},
];

class MockCustomerProductService {
    public myProducts: ProductViewModel[] = PRODUCTS
    getProducts(): Promise<ProductViewModel[]> {
        return Promise.resolve(PRODUCTS);
    }
}

class CustomerProductService {
    getProducts():Promise<ProductViewModel[]>{
        throw Error("Not implemented yet");
        //return Promise.resolve(PRODUCTS);
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

        // Debounce???
        // Call the service
        fixture.componentInstance.getProducts();
        // Filter on products previously purchased
        // Return the products
        fixture.whenStable().then(()=>{
            const products = fixture.debugElement.queryAll(By.css('customer-product'));
            expect(products.length).toBeGreaterThan(0); // FAILS
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
