import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../auth/authSlice'
import { RootState } from '../store';
import { InternalErrorCode } from '../../../utils/InternalErrorCode';
import { APIConstants } from '../../../constants/api.constant';
import APIResponse from '../../../types/APIResponse';
import axios from 'axios';
import { Tokens } from '../../../types/Tokens';


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL as string,
    prepareHeaders: (headers, { getState }) => {
        const tokens = (getState() as RootState).auth.tokens;

        if (tokens.access_token) {
            headers.set("Authorization", `Bearer ${tokens.access_token}`)
        }
        return headers
    },
})


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string,
    headers: {
        'Content-Type': 'application/json',
    },
});

const refreshToken = async (refreshToken: string) => {
    try {
        const response = await axiosInstance.post(APIConstants.AUTH.REFRESH_TOKEN, {
            refreshToken,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};



const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    const apiResponse = result?.error?.data as APIResponse;

    if (apiResponse?.internalCode === InternalErrorCode.UNAUTHENTICATED) {
        console.log('sending refresh token')

        // Get the current state
        const state = api.getState() as RootState;

        // Send refresh token to get a new access token
        const refreshResponse = await refreshToken(state.auth.tokens.refresh_token);
        console.log('refreshResponse', refreshResponse)

        if (refreshResponse?.internalCode === InternalErrorCode.SUCCESS) {

            // get the new tokens
            const tokens: Tokens = {
                access_token: refreshResponse.result.tokens.access_token,
                refresh_token: refreshResponse.result.tokens.refresh_token
            };

            const rememberMe = localStorage.getItem("REMEMBER_ME") ? JSON.parse(localStorage.getItem("REMEMBER_ME") ?? "") : false;

            // store the new token 
            api.dispatch(setCredentials({
                tokens: tokens,
                user: rememberMe ? JSON.parse(localStorage.getItem("USER") ?? "") : JSON.parse(sessionStorage.getItem("USER") ?? ""),
                rememberMe: rememberMe
            }))

            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Category", "Product", "Rating"],
    endpoints: (builder) => ({})
})