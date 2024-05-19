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

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials: Credentials) => ({
                url: APIConstants.AUTH.AUTHENTICATE,
                method: 'POST',
                body: { ...credentials },
            }),

            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;

                    const apiResponse = response.data as APIResponse;

                    dispatch(setCredentials(apiResponse.result));
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

export const { useLoginMutation, useSendLogOutMutation } =
    authApiSlice;