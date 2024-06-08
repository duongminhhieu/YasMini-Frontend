import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { message } from "antd";
import { Cart, CartBody, CartUpdate } from "../../../types/Cart";
import { deleteACart, setCarts } from "./cartSlice";
import { InternalErrorCode } from "../../../utils/InternalErrorCode";


export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCarts: builder.query<APIResponse, void>({
            query: () => APIConstants.CART.GET_ALL_CART,
            providesTags: ["Cart"],
            onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
                try {
                    const response = await queryFulfilled;

                    const apiResponse = response.data as APIResponse;

                    dispatch(setCarts(apiResponse.result as Cart[]));

                } catch (error: any) {
                    const apiResponse = error?.error?.data as APIResponse;
                    message.error(apiResponse.message);

                }
            }
        }),
        createCart: builder.mutation<APIResponse, CartBody>({
            query: (cartBody: CartBody) => ({
                url: APIConstants.CART.CREATE_CART,
                method: "POST",
                body: cartBody,
                providesTags: ["Cart"],
            }),
        }),
        updateCart: builder.mutation<APIResponse, CartUpdate>({

            query: (cartBody: CartUpdate) => ({
                url: APIConstants.CART.UPDATE_CART(cartBody.id),
                method: "PUT",
                body: {
                    quantity: cartBody.quantity
                },
                providesTags: ["Cart"],
            }),
        }),
        deleteCarts: builder.mutation<APIResponse, string[]>({
            query: (ids: string[]) => ({
                url: APIConstants.CART.DELETE_CARTS,
                method: "DELETE",
                body: {
                    ids: ids
                },
                providesTags: ["Cart"],
            }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
                try {
                    const response = await queryFulfilled;
                    const apiResponse = response.data as APIResponse;
                    if (apiResponse.internalCode === InternalErrorCode.SUCCESS) {
                        dispatch(deleteACart(args[0] as unknown as string[]));
                    }

                } catch (error: any) {
                    const apiResponse = error?.error?.data as APIResponse;
                    message.error(apiResponse.message);

                }
            }

        }),
        getCartsByIds: builder.query<APIResponse, string[]>({
            query: (ids: string[]) => APIConstants.CART.GET_CART_BY_IDS(ids),
            providesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetAllCartsQuery,
    useCreateCartMutation,
    useUpdateCartMutation,
    useDeleteCartsMutation,
    useGetCartsByIdsQuery

} = cartApi;