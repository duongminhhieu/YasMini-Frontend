import { message } from 'antd';
import { APIConstants } from '../../../services/api.constant';
import APIResponse from '../../../utils/APIResponse';
import { InternalErrorCode } from '../../../utils/InternalErrorCode';
import { apiSlice } from '../../api/apiSlice';
import { logOut, setCredentials } from './authSlice';


export type Credentials = {
    email: string;
    password: string;
};

export type AccountInfo = {
    credentials: Credentials;
    rememberMe: boolean;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (accountInfo: AccountInfo) => ({
                url: APIConstants.AUTH.AUTHENTICATE,
                method: 'POST',
                body: { ...accountInfo.credentials },
            }),

            async onQueryStarted(accountInfo, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;

                    const apiResponse = response.data as APIResponse;

                    dispatch(setCredentials(apiResponse.result));

                    const { tokens, user } = apiResponse.result;

                    if (accountInfo.rememberMe) {
                        // if remember me is checked, store the tokens in local storage
                        localStorage.setItem("TOKENS", JSON.stringify(tokens));
                        localStorage.setItem("USER", JSON.stringify(user));
                    } else {
                        sessionStorage.setItem("TOKENS", JSON.stringify(tokens));
                        sessionStorage.setItem("USER", JSON.stringify(user));
                    }

                } catch (error: any) {
                    const apiResponse = error?.error?.data as APIResponse;
                    if (apiResponse.internalCode === InternalErrorCode.EMAIL_OR_PASSWORD_INCORRECT) {
                        message.error('Email or password is incorrect');
                    } else {
                        message.error('Something went wrong');
                    }

                }
            },
        }),

        sendLogOut: builder.mutation({
            query: () => ({
                url: APIConstants.AUTH.LOG_OUT,
                method: 'POST',
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logOut());
                    dispatch(apiSlice.util.resetApiState());
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const { useLoginMutation, useSendLogOutMutation } = authApiSlice;