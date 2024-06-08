import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { message } from "antd";
import { setNotifications } from "./notificationSlice";
import { Notification } from "../../../types/Notification";


export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query<APIResponse, void>({
            query: () => APIConstants.NOTIFICATION.GET_ALL,
            providesTags: ["Notification"],
            onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
                try {
                    const response = await queryFulfilled;

                    const apiResponse = response.data as APIResponse;

                    dispatch(setNotifications(apiResponse.result as Notification[]));


                } catch (error: any) {
                    const apiResponse = error?.error?.data as APIResponse;
                    message.error(apiResponse.message);

                }
            }
        }),

    }),
});

export const {
    useGetAllNotificationsQuery,

} = notificationApi;