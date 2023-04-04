// // src/store/user/userSlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IssueState } from './issueTypes';

// const initialState: IssueState = {
//     issues: [],
//     selectedPage: 0,
//     pageSize: 0,
//     totalCount: 0,
//     error: null,
// };

// const issueSlice = createSlice({
//     name: 'issue',
//     initialState,
//     reducers: {
//         setAllIssues: (state, action: PayloadAction<IssueState['issues']>) => {
//             state.issues = action.payload;
//         },
//         setError: (state, action) => {
//             state.error = action.payload;
//         },
//     },
// });

// export const { setAllIssues, setError } = issueSlice.actions;
// export default issueSlice.reducer;
