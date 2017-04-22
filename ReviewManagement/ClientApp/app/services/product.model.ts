export class Product {
    name: string;
    description: string;

    reviews: Review[];
}

// Maps to ReviewsDTO in C# land
export class Review {
    customerEmail: string;
    product: string;
    stars: number;
    comments: string;
    dateTime: string;
    state: string;
}