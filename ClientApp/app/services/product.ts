export class Product {
    name: string;
    description: string;

    reviews: Review[];
}


export class Review {
    stars: number;
    comments: string;
}
