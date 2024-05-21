import { CategoryParams } from "../types/Category";


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

    if (params.isAvailable) {
        query.append("isAvailable", params.isAvailable.toString().toUpperCase());
    }

    return query.toString();
}