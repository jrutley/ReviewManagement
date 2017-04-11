import { async, inject, TestBed } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CustomerProductService } from './customer-product.service';

const mockResponse = {
    data: [
        { product: { name: 'Product 1' }, review: { comments: 'Sucks!'}}
    ]
};

describe('Customer-product: Service', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [{ provide: XHRBackend, useClass: MockBackend }]
        });
    }));

  describe('getProducts', () => {
      it('should return a Promise<ProductViewModel>', () => {
          inject([CustomerProductService, XHRBackend], (service, backend) => {

              backend.connections.subscribe((connection) => {
                  connection.mockRespond(new Response(new ResponseOptions({
                      body: JSON.stringify(mockResponse)
                  })));
              });


              service.getProducts().then(p => {
                  expect(p).toHaveBeenCalled();
                  //expect(p[0]).toBe()
                  expect(p).toThrowError("Finish me");
              })
          })
      })
  })
})