import { Product } from './product.model';

// Maps to ReviewsDTO in C# land
export class Review {
  customerEmail: string;
  product: string;
  stars: number;
  comments: string;
  dateTime: string;
  state: string;
}

export class CustomerViewDTO {
  product: Product;
  review: Review;
}
