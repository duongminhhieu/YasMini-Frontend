import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";
import { RatingCreateParams, RatingParams } from "../../../types/Rating";


export const ratingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRating: builder.mutation<APIResponse, RatingCreateParams>({
            query: (ratingParams: RatingCreateParams) => ({
                url: APIConstants.RATING.CREATE,
                method: "POST",
                body: ratingParams,
                providesTags: ["Rating"],
            }),
        }),
        getRatings: builder.query<APIResponse, RatingParams>({
            query: (params: RatingParams) => APIConstants.RATING.GET_LIST_RATING(params),
            providesTags: ["Rating"],
        }),

    }),
});

export const {
    useCreateRatingMutation,
    useGetRatingsQuery
} = ratingApi;