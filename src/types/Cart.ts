import { Product } from "./Product";


export type Cart = {
    id: string;
    quantity: number;
    price: number;
    product: Product;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
}

export type CartBody = {
    productId: string;
    quantity: number;
}

export type CartUpdate = {
    id: string;
    quantity: number;
}
