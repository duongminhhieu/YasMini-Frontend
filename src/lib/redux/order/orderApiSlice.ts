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
        getOrderByIdAdmin: builder.query<APIResponse, string>({
            query: (id: string) => APIConstants.ORDER.GET_BY_ID_ADMIN(id),
            providesTags: ["Order"],
        }),
        updateStatusOrder: builder.mutation<APIResponse, { id: string, status: string }>({
            query: ({ id, status }) => ({
                url: APIConstants.ORDER.UPDATE_STATUS(id, status),
                method: "PATCH",
                providesTags: ["Order"],
            }),
        }),
    }),
});

export const {
    usePlaceOrderMutation,
    useGetAllOrdersQuery,
    useGetOrderByIdQuery,
    useGetAllOrdersAdminQuery,
    useGetOrderByIdAdminQuery,
    useUpdateStatusOrderMutation
} = orderApi;