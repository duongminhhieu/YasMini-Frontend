import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { incrementByAmountQuantity } from "./cartSlice";
import { message } from "antd";


export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCarts: builder.query<APIResponse, void>({
            query: () => APIConstants.CART.GET_ALL_CART,
            providesTags: ["Cart"],
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    const response = await queryFulfilled;

                    const apiResponse = response.data as APIResponse;

                    dispatch(incrementByAmountQuantity(apiResponse.result.length));

                } catch (error: any) {
                    const apiResponse = error?.error?.data as APIResponse;
                    message.error(apiResponse.message);

                }
            }
        }),

    }),
});

export const {
    useGetAllCartsQuery,

} = cartApi;