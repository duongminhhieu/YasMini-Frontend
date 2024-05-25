import { CategoryParams } from "../types/Category";
import { ProductParams } from "../types/Product";


export function parseCategoryParams(params: CategoryParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.itemsPerPage) {
        query.append("itemsPerPage", params.itemsPerPage.toString());
    }

    if (params.name) {
        query.append("name", params.name);
    }

    if (params.isAvailable !== null && params.isAvailable !== undefined) {
        query.append("isAvailable", params.isAvailable.toString().toUpperCase());
    }

    return query.toString();
}

export function parseProductParams(params: ProductParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.itemsPerPage) {
        query.append("itemsPerPage", params.itemsPerPage.toString());
    }

    if (params.name) {
        query.append("name", params.name);
    }

    if (params.isAvailable !== null && params.isAvailable !== undefined) {
        query.append("isAvailable", params.isAvailable.toString().toUpperCase());
    }

    if (params.isFeatured !== null && params.isFeatured !== undefined) {
        query.append("isFeatured", params.isFeatured.toString().toUpperCase());
    }

    if (params.categoryIds) {
        query.append("categoryIds", params.categoryIds.join(","));
    }

    if (params.minPrice) {
        query.append("minPrice", params.minPrice.toString());
    }

    if (params.maxPrice) {
        query.append("maxPrice", params.maxPrice.toString());
    }

    if (params.minRating) {
        query.append("minRating", params.minRating.toString());
    }

    if (params.orderBy) {
        query.append("orderBy", params.orderBy.join(","));
    }

    if (params.sortBy) {
        query.append("sortBy", params.sortBy);
    }

    return query.toString();
}