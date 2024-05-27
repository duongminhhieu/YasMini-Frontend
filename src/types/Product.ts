import { Category } from "./Category";
import { Storage } from "./Storage";


export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    slug: string;
    sku: string;
    isFeatured: boolean;
    quantity: number;
    averageRating: number;
    isAvailable: boolean;
    thumbnail: string | null;
    attributes: ProductAttributes[];
    categories: Category[];
    images: Storage[];
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
}


export type ProductAttributes = {
    id: string;
    name: string;
    values: ProductAttributeValue[];
}

export type ProductAttributeValue = {
    id: string;
    value: string;
}


export type ProductParams = {

    name: string | null;
    isAvailable: boolean;
    isFeatured: boolean | null;
    categoryIds: string[];
    minPrice: number | null;
    maxPrice: number | null;
    minRating: number | null;
    orderBy: string[];
    sortBy: string;

    page: number;
    itemsPerPage: number;
}