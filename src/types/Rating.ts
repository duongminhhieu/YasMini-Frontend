import { Product } from "./Product";
import { User } from "./User";

export type Rating = {
    id: string;
    star: number;
    comment: string;
    product: Product;
    user: User;
    createdDate: Date;
}

export type RatingCreateParams = {
    star: number;
    comment: string;
    productId: string;
};


export type RatingParams = {
    page: number;
    itemsPerPage: number;
    productId: string;
};
