import { message } from 'antd';
import { APIConstants } from '../../../constants/api.constant';
import { InternalErrorCode } from '../../../utils/InternalErrorCode';
import { apiSlice } from '../api/apiSlice';
import { logOut, setCredentials } from './authSlice';
import APIResponse from '../../../types/APIResponse';
import { UserRegister } from '../../../types/User';


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


                    const { tokens, user } = apiResponse.result;
                    localStorage.setItem("REMEMBER_ME", JSON.stringify(accountInfo.rememberMe));

                    if (accountInfo.rememberMe) {
                        // if remember me is checked, store the tokens in local storage
                        localStorage.setItem("TOKENS", JSON.stringify(tokens));
                        localStorage.setItem("USER", JSON.stringify(user));
                        dispatch(setCredentials({ tokens, user, rememberMe: true }));
                    } else {
                        sessionStorage.setItem("TOKENS", JSON.stringify(tokens));
                        sessionStorage.setItem("USER", JSON.stringify(user));
                        dispatch(setCredentials({ tokens, user, rememberMe: false }));
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
            query: (token: string) => ({
                url: APIConstants.AUTH.LOG_OUT,
                method: 'POST',
                body: {
                    token
                },
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
        register: builder.mutation({
            query: (user: UserRegister) => ({
                url: APIConstants.AUTH.REGISTER,
                method: 'POST',
                body: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                },
            }),

            async onQueryStarted(_arg, { queryFulfilled }) {
                try {
                    const response = await queryFulfilled;

                    const apiResponse = response.data as APIResponse;

                    if (apiResponse.internalCode === InternalErrorCode.SUCCESS) {
                        window.location.href = '/login';
                        message.success('Register success');
                        // redirect to login page
                    } else {
                        message.error(apiResponse.message);
                    }

                } catch (error: any) {
                    const apiResponse = error?.error?.data as APIResponse;
                    if (apiResponse.internalCode === InternalErrorCode.EMAIL_ALREADY_EXISTS) {
                        message.error('Email or password is incorrect');
                    } else {
                        message.error(apiResponse.message);
                    }

                }
            },
        })
    }),
});

export const { useLoginMutation, useSendLogOutMutation, useRegisterMutation } = authApiSlice;