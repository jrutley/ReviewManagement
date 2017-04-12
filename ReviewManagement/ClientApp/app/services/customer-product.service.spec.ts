import { async, inject, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CustomerProductService } from './customer-product.service';

const mockResponse = {
    data: [
        { product: { name: 'Product 1' }, review: { comments: 'Sucks!' } }
    ]
};

describe('Customer-product service\'s', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [{ provide: XHRBackend, useClass: MockBackend }, CustomerProductService]
        });
    }));

    describe('getProducts', () => {
        it('should return a Promise<ProductViewModel>',
            async(inject([CustomerProductService, XHRBackend], (service, backend) => {

                backend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                service.getProducts().then(p => {
                    console.log(p);
                    expect(p.data[0]).toBe("Product 1");
                })
            })));
    })
})