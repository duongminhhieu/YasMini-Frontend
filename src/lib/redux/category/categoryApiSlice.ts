import { CategoryParams } from "../../../types/Category";
import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../utils/APIResponse";


const params: CategoryParams = {
    name: '',
    isAvailable: true,
    page: 1,
    itemsPerPage: 10,
};


export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<APIResponse, CategoryParams>({
            query: () => APIConstants.CATEGORY.GET_ALL_ADMIN(params),
            providesTags: ["Category"],
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;