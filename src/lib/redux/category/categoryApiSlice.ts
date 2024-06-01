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
        getInfoCategory: builder.query<APIResponse, string>({
            query: (id: string) => APIConstants.CATEGORY.GET_BY_ID(id),
            providesTags: ["Category"],
        }),
        getCategoryBySlug: builder.query<APIResponse, string>({
            query: (slug: string) => APIConstants.CATEGORY.GET_BY_SLUG(slug),
            providesTags: ["Category"],
        })
        ,
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
        toggleAvailabilityCategory: builder.mutation<APIResponse, string[]>({
            query: (ids: string[]) => ({
                url: APIConstants.CATEGORY.TOGGLE_AVAILABILITY,
                method: "PATCH",
                body: {
                    ids,
                },
            }),
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation<APIResponse, Category>({
            query: (category: Category) => ({
                url: APIConstants.CATEGORY.UPDATE(category.id),
                method: "PUT",
                body: {
                    name: category.name,
                    slug: category.slug,
                    description: category.description,
                    isAvailable: category.isAvailable,
                },
            }),
            invalidatesTags: ["Category"],
        }),
        hardDeleteCategory: builder.mutation<APIResponse, string[]>({
            query: (ids: string[]) => ({
                url: APIConstants.CATEGORY.DELETE,
                method: "DELETE",
                body: {
                    ids,
                }
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useToggleAvailabilityCategoryMutation,
    useGetInfoCategoryQuery,
    useUpdateCategoryMutation,
    useHardDeleteCategoryMutation,
    useGetCategoryBySlugQuery
} = categoryApi;