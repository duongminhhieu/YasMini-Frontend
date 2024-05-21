import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { Category, CategoryParams } from "../../../types/Category";


export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<APIResponse, CategoryParams>({
            query: (params: CategoryParams) => APIConstants.CATEGORY.GET_ALL_ADMIN(params),
            providesTags: ["Category"],
        }),
        createCategory: builder.mutation<APIResponse, Category>({
            query: (category: Category) => ({
                url: APIConstants.CATEGORY.CREATE,
                method: "POST",
                body: {
                    name: category.name,
                    slug: category.slug,
                    description: category.description,
                },
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;