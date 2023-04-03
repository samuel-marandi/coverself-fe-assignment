import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseUrl, HttpMethods } from '../utils/http/http';

interface GetIssuesParams {
    currentPage: number;
    itemsPerPage: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

// Define the apiClient using RTK Query's createApi
export const apiClient = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl.API }),
    endpoints: builder => ({
        getIssueById: builder.query({
            query: (id: string) => ({
                url: `issues/${id}`,
                method: HttpMethods.GET,
            }),
        }),
        getAllIssues: builder.query({
            query: (params: GetIssuesParams) => ({
                url: 'issues',
                method: HttpMethods.GET,
                params: {
                    _page: params.currentPage,
                    _limit: params.itemsPerPage,
                    _sort: params.sortBy,
                    _order: params.sortOrder,
                },
            }),
        }),
    }),
});

// Export the auto-generated hooks for each endpoint
// export const { useQuery, useMutation } = apiClient;

// Export the auto-generated middleware and reducer for the Redux store
export const { useGetAllIssuesQuery, useGetIssueByIdQuery } = apiClient;
export default apiClient.reducer;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BaseUrl, HttpMethods } from '../utils/http/http';

// // Define the issueApi using RTK Query's createApi
// export const issueApi = createApi({
//     reducerPath: 'issue',
//     baseQuery: fetchBaseQuery({ baseUrl: BaseUrl.API }),
//     endpoints: builder => ({
//         getIssueById: builder.query({
//             query: (id: string) => ({
//                 url: `users/${id}`,
//                 method: HttpMethods.GET,
//             }),
//         }),
//         getAllIssues: builder.query({
//             query: () => ({
//                 url: 'issues',
//                 method: HttpMethods.GET,
//             }),
//         }),
//     }),
// });

// export const { useGetAllIssuesQuery, useGetIssueByIdQuery } = issueApi;
// export default issueApi.reducer;
