// import { HttpMethods } from '../../utils/http/http';
// import { apiClient } from '../apiClient';

// export const issueEndpoints = apiClient.injectEndpoints({
// endpoints: builder => ({
//     getIssueById: builder.query({
//         query: (id: string) => ({
//             url: `users/${id}`,
//             method: HttpMethods.GET,
//         }),
//     }),
//     getAllIssues: builder.query({
//         query: () => ({
//             url: 'issues',
//             method: HttpMethods.GET,
//         }),
//     }),
// }),
// });


// export const { useGetAllIssuesQuery, useGetIssueByIdQuery } = issueEndpoints;
