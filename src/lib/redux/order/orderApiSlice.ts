import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { OrderCreateBody, OrderParams } from "../../../types/Order";


export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation<APIResponse, OrderCreateBody>({
            query: (orderCreateBody: OrderCreateBody) => ({
                url: APIConstants.ORDER.CREATE,
                method: "POST",
                body: orderCreateBody,
                providesTags: ["Order"],
            }),
        }),
        getAllOrders: builder.query<APIResponse, void>({
            query: () => APIConstants.ORDER.GET_ALL,
            providesTags: ["Order"],
        }),
        getOrderById: builder.query<APIResponse, string>({
            query: (id: string) => APIConstants.ORDER.GET_BY_ID(id),
            providesTags: ["Order"],
        }),
        getAllOrdersAdmin: builder.query<APIResponse, OrderParams>({
            query: (orderParams: OrderParams) => APIConstants.ORDER.GET_ALL_ADMIN(orderParams),
            providesTags: ["Order"],
        }),
    }),
});

export const {
    usePlaceOrderMutation,
    useGetAllOrdersQuery,
    useGetOrderByIdQuery,
    useGetAllOrdersAdminQuery
} = orderApi;