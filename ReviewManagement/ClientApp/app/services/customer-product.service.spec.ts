import { async, inject, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CustomerProductService } from './customer-product.service';

const SERVICEPRODUCTNAME = 'Service product name';
const SERVICEPRODUCTCOMMENT = 'Service comment';
const mockResponse = {
    data: [
        { product: { name: SERVICEPRODUCTNAME }, review: { comments: SERVICEPRODUCTCOMMENT } }
    ]
};

describe('Customer-product service\'s', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [{ provide: XHRBackend, useClass: MockBackend }, CustomerProductService]
        });
    }));

    describe('getAllEmails', () => {
        it('should return all customers in a data list', () => {
            const testEmail = 'test@example.com';
            async(inject([CustomerProductService, XHRBackend], (service, xhr) => {
                xhr.connections.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify({ data: [testEmail] })
                })))
                service.getAllEmails().then(e => {
                    expect(e.length).toBe(1);
                    expect(e[0]).toBe(testEmail);
                })
            }))
        })
    })

    describe('getProducts', () => {
        it('should return an empty Product array when email not found',
            async(inject([CustomerProductService, XHRBackend], (service, backend) => {

                backend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify({ data: [] })
                    })));
                });

                service.getProducts("email").then(p => {
                    expect(p.length).toBe(0);
                })
            })));

        it('should return an empty Review when the customer hasn\'t written a review for that product',
            async(inject([CustomerProductService, XHRBackend], (service, backend) => {

                backend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify({
                            data: [
                                { product: { name: SERVICEPRODUCTNAME } }
                            ]
                        })
                    })));
                });

                service.getProducts("email").then(p => {
                    expect(p[0].name).toBe(SERVICEPRODUCTNAME);
                    expect(p[0].review).toBe(undefined);
                })
            })));

        it('should return a Promise<ProductViewModel[]>',
            async(inject([CustomerProductService, XHRBackend], (service, backend) => {

                backend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                service.getProducts("email").then(p => {
                    expect(p[0].name).toBe(SERVICEPRODUCTNAME);
                    expect(p[0].review).toBe(SERVICEPRODUCTCOMMENT);
                })
            })));
    })
})