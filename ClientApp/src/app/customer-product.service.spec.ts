import { CustomerProductService } from './customer-product.service';
import { defer } from 'rxjs';

let httpClientSpy: { get: jasmine.Spy };
let service: CustomerProductService;

const SERVICEPRODUCTNAME = 'Service product name';

beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  service = new CustomerProductService(<any>httpClientSpy);
});

function asyncData(value) {
  return defer(() => Promise.resolve(value));
}

describe('Customer-product service\'s', () => {
  describe('getAllEmails', () => {
    it('should return all customers in a data list', () => {
      const expectedEmails = ['test@example.com'];
      httpClientSpy.get.and.returnValue(asyncData(expectedEmails));

      service.getAllEmails().subscribe(e => {
        expect(e.length).toBe(1);
        expect(e[0]).toBe(expectedEmails[0]);
      });
    });
  });

  describe('getProducts', () => {
    it('should return an empty Product array when email not found', () => {
      httpClientSpy.get.and.returnValue(asyncData([]));
      service.getProducts('email').subscribe(p => {
        expect(p.length).toBe(0);
      });
    });

    it('should return an empty Review when the customer hasn\'t written a review for that product', () => {
      const products = [{ product: { name: SERVICEPRODUCTNAME }}];
      httpClientSpy.get.and.returnValue(asyncData(products));

      service.getProducts('email').subscribe(p => {
        expect(p[0].name).toBe(SERVICEPRODUCTNAME);
        expect(p[0].review).toBe(undefined);
      });
    });
  });
});
