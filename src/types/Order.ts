import { Product } from "./Product";
import { User } from "./User";

export type Order = {
    id: string;
    totalQuantity: number;
    totalPrice: number;
    status: string;
    user: User;
    orderAddress: OrderAddress;
    orderItems: OrderItem[];
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
}

export type OrderAddress = {
    id?: string;
    contactName?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
}

export type OrderItem = {
    id: string;
    quantity: number;
    price: number;
    product: Product;
}

export type OrderCreateBody = {
    cartItemIds: string[];
    orderAddress: OrderAddress;
}

export type OrderUpdateBody = {
    status: string;
}

export type OrderParams = {
    status: string | null;
    page: number;
    itemsPerPage: number;
    sortBy: string | null;
    orderBy: string | null;
}

