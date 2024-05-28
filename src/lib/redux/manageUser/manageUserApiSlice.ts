import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { PaginationParams } from "../../../types/Pagination";


export const manageUserApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getListUser: builder.query<APIResponse, PaginationParams>({
            query: (params: PaginationParams) => APIConstants.ADMIN.GET_ALL_USER(params),
            providesTags: ["User"],
        }),
        changeStatusUser: builder.mutation<APIResponse, { id: string }>({
            query: ({ id }) => ({
                url: APIConstants.ADMIN.TOGGLE_ACTIVE_USER(id),
                method: "PATCH",
                providesTags: ["User"],
            }),
        }),

    }),
});

export const {
    useGetListUserQuery,
    useChangeStatusUserMutation
} = manageUserApi;