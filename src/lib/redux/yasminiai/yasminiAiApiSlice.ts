import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";


export const yasminiAiApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchProductByImage: builder.mutation<APIResponse, FormData>({
            query: (formData: FormData) => ({
                url: APIConstants.AI.AI,
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

export const {
    useSearchProductByImageMutation
} = yasminiAiApi;