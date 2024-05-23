import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { Product } from "../../../types/Product";


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

    }),
});

export const {
    useStoreImageMutation,
    useGetAllCategoriesQuery,
    useCreateProductMutation
} = productApi;