import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { Product, ProductParams } from "../../../types/Product";


export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        storeImage: builder.mutation<APIResponse, FormData>({
            query: (formData: FormData) => ({
                url: APIConstants.STORAGE.UPLOAD,
                method: "POST",
                body: formData,
            }),
        }),
        getAllCategories: builder.query<APIResponse, void>({
            query: () => APIConstants.CATEGORY.GET_ALL,
            providesTags: ["Category"],
        }),
        createProduct: builder.mutation<APIResponse, Product>({
            query: (product) => ({
                url: APIConstants.PRODUCT.CREATE,
                method: "POST",
                body: product,
                providesTags: ["Product"],
            }),
        }),
        getProductsAdmin: builder.query<APIResponse, ProductParams>({
            query: (params: ProductParams) => APIConstants.PRODUCT.GET_ALL_ADMIN(params),
            providesTags: ["Product"],
        }),
        getProducts: builder.query<APIResponse, ProductParams>({
            query: (params: ProductParams) => APIConstants.PRODUCT.GET_ALL(params),
            providesTags: ["Product"],
        }),
        toggleAvailabilityProducts: builder.mutation<APIResponse, string[]>({
            query: (ids: string[]) => ({
                url: APIConstants.PRODUCT.TOGGLE_AVAILABILITY,
                method: "PATCH",
                body: {
                    ids,
                },
            }),
            invalidatesTags: ["Product"],
        }),
        hardDeleteProduct: builder.mutation<APIResponse, string[]>({
            query: (ids: string[]) => ({
                url: APIConstants.PRODUCT.DELETE,
                method: "DELETE",
                body: {
                    ids,
                }
            }),
            invalidatesTags: ["Product"],
        }),
        getInfoProduct: builder.query<APIResponse, string>({
            query: (id: string) => APIConstants.PRODUCT.GET_BY_ID(id),
            providesTags: ["Product"],
        }),
        updateProduct: builder.mutation<APIResponse, Product>({
            query: (product) => ({
                url: APIConstants.PRODUCT.UPDATE(product.id),
                method: "PUT",
                body: product,
                providesTags: ["Product"],
            }),
        }),
        getProductBySlug: builder.query<APIResponse, string>({
            query: (slug: string) => APIConstants.PRODUCT.GET_BY_SLUG(slug),
            providesTags: ["Product"],
        }),
    }),
});

export const {
    useStoreImageMutation,
    useGetAllCategoriesQuery,
    useCreateProductMutation,
    useGetProductsAdminQuery,
    useGetProductsQuery,
    useHardDeleteProductMutation,
    useToggleAvailabilityProductsMutation,
    useGetInfoProductQuery,
    useUpdateProductMutation,
    useGetProductBySlugQuery
} = productApi;