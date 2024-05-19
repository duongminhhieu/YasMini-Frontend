import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../redux/auth/authSlice'
import { RootState } from '../redux/store';
import APIResponse from '../../utils/APIResponse';
import { InternalErrorCode } from '../../utils/InternalErrorCode';
import { APIConstants } from '../../services/api.constant';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL as string,
    prepareHeaders: (headers, { getState }) => {
        const tokens = (getState() as RootState).auth.tokens;

        if (tokens?.accessToken) {
            headers.set("authorization", `Bearer ${tokens.accessToken}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    const apiResponse = result?.error?.data as APIResponse;

    if (apiResponse?.internalCode === InternalErrorCode.UNAUTHENTICATED) {
        console.log('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery(APIConstants.AUTH.REFRESH_TOKEN, api, extraOptions)

        const refreshResponse = refreshResult?.data as APIResponse;

        if (refreshResponse.internalCode === InternalErrorCode.SUCCESS) {
            const tokens = (api.getState() as RootState).auth.tokens;

            // store the new token 
            api.dispatch(setCredentials({ tokens: tokens, user: JSON.parse(localStorage.getItem("USER") ?? "") }))

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
    endpoints: (builder) => ({})
})