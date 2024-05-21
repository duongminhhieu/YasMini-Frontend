import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { CategoryParams } from "../../../types/Category";




export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<APIResponse, CategoryParams>({
            query: (params: CategoryParams) => APIConstants.CATEGORY.GET_ALL_ADMIN(params),
            providesTags: ["Category"],
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;