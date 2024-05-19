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
    };


    static CATEGORY = {
        GET_ALL: '/categories',
        GET_BY_ID: (id: string) => `/categories/${id}`,
        CREATE: '/categories',
        UPDATE: (id: string) => `/categories/${id}`,
        DELETE: (id: string) => `/categories/${id}`,
    };


    static PRODUCT = {
        GET_ALL: '/products',
        GET_BY_ID: (id: string) => `/products/${id}`,
        CREATE: '/products',
        UPDATE: (id: string) => `/products/${id}`,
        DELETE: (id: string) => `/products/${id}`,
    };


}