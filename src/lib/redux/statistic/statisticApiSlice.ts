import { apiSlice } from "../api/apiSlice";
import { APIConstants } from "../../../constants/api.constant";
import APIResponse from "../../../types/APIResponse";


export const statisticApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStatistic: builder.query<APIResponse, void>({
            query: () => APIConstants.STATISTICS.GET,
            providesTags: ["Statistic"],
        }),
    }),
});

export const {
    useGetStatisticQuery
} = statisticApi;