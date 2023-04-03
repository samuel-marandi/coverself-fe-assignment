// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const issuesApi = createApi({
//   reducerPath: 'issuesApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
//   endpoints: builder => ({
//     getAllIssues: builder.query({
//       query: () => 'issues',
//     }),
//     getSingleIssue: builder.query({
//       query: (issueId: number) => `issue/${issueId}`,
//     }),
//   }),
// });

// export const { useGetAllIssuesQuery, useGetSingleIssueQuery } = issuesApi;
// interface UserState {
//   currentUser: {
//     id: string;
//     name: string;
//     email: string;
//   } | null;
//   status: 'idle' | 'loading' | 'error';
//   error: string | null;
// }

// const initialState: UserState = {
//   currentUser: null,
//   status: 'idle',
//   error: null,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setCurrentUser: (state, action: PayloadAction<UserState['currentUser']>) => {
//       state.currentUser = action.payload;
//     },
//     setStatus: (state, action: PayloadAction<UserState['status']>) => {
//       state.status = action.payload;
//     },
//     setError: (state, action: PayloadAction<UserState['error']>) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const { setCurrentUser, setStatus, setError } = userSlice.actions;
// export default userSlice.reducer;
