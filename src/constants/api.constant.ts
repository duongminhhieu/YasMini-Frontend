import { CategoryParams } from "../types/Category";
import { PaginationParams } from "../types/Pagination";
import { ProductParams } from "../types/Product";
import { RatingParams } from "../types/Rating";
import { parseCategoryParams, parsePaginationParams, parseProductParams, parseRatingParams } from "../utils/parseParams";

export class APIConstants {
    static USERS = {
        SIGNUP: '/users/signup',
        LOGIN: '/users/login',
        FORGOT_PASSWORD: '/users/identify',
        RESET_PASSWORD: '/users/reset-password',
        UPDATE_PASSWORD: '/users/update-password',
        UPDATE_PROFILE: '/users',
        VERIFY: '/users/verify',
        RESEND: '/users/resend-signup-activation',
        GET_ALL: '/users',
        GET_BY_ID: (id: string) => `/users/${id}`,
        GET_ME: '/users/me',
        GOOGLE_AUTH_CALLBACK: (queryString: string) => `/users/auth/google/callback${queryString}`,
        COMPLETE_PROFILE: '/users/complete-profile',

    };

    static AUTH = {
        AUTHENTICATE: '/auth/authenticate',
        REGISTER: '/auth/register',
        LOG_OUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh',
    };

    static ADMIN = {
        PERMISSION: '/permissions',
        ROLE: '/roles',
        DELETE_PERMISSION: (permission: string) => `/permissions/${permission}`,
        DELETE_ROLE: (role: string) => `/roles/${role}`,
        GET_ALL_USER: (params: PaginationParams) => `/users?${parsePaginationParams(params)}`,
        TOGGLE_ACTIVE_USER: (id: string) => `/users/${id}/toggle-active`,
    };


    static CATEGORY = {
        GET_ALL: '/categories',
        GET_ALL_ADMIN: (params: CategoryParams) => `/categories/admin?${parseCategoryParams(params)}`,
        GET_BY_ID: (id: string) => `/categories/${id}`,
        GET_BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
        CREATE: '/categories',
        UPDATE: (id: string) => `/categories/${id}`,
        DELETE: `/categories`,
        TOGGLE_AVAILABILITY: "/categories/toggle-availability",
    };


    static PRODUCT = {
        GET_ALL: (params: ProductParams) => `/products?${parseProductParams(params)}`,
        GET_ALL_ADMIN: (params: ProductParams) => `/products/admin?${parseProductParams(params)}`,
        GET_BY_ID: (id: string) => `/products/id/${id}`,
        CREATE: '/products',
        UPDATE: (id: string) => `/products/${id}`,
        DELETE: `/products`,
        TOGGLE_AVAILABILITY: "/products/toggle-availability",
        GET_BY_SLUG: (slug: string) => `/products/${slug}`,
    };

    static STORAGE = {
        UPLOAD: '/storage',
    };

    static RATING = {
        CREATE: '/rating',
        GET_LIST_RATING: (params: RatingParams) => `/rating?${parseRatingParams(params)}`,
    };

    static CART = {
        GET_ALL_CART: '/carts',
        CREATE_CART: '/carts',
        UPDATE_CART: (id: string) => `/carts/${id}`,
        DELETE_CARTS: '/carts',
        GET_CART_BY_IDS: (ids: string[]) => `/carts/get-by-ids?ids=${ids.join(',')}`,
    };

    static ORDER = {
        CREATE: '/orders',
        GET_ALL: '/orders',
        GET_BY_ID: (id: string) => `/orders/${id}`,
    };

}