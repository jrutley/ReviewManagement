import { Review } from './review.model';

export class Product {
  productId: number;
  name: string;
  description: string;

  reviews: Review[];
}

