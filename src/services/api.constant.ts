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

}