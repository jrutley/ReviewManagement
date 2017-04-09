import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product.model'

export class ProductData implements InMemoryDbService {
  createDb() {
    let products = [
      { id: 1, name: "Luke's lightsaber" },
      { id: 2, name: "Leia's hair earmuffs" }
    ];
    return { products };
  }
}