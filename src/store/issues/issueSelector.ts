// src/store/user/userSelectors.ts

// import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export const selectIssueState = (state: RootState) => state.issue;

// export const select

// export const selectCurrentUser = createSelector(
//   selectUserState,
//   (userState) => userState.currentUser,
// );

// export const selectUserStatus = createSelector(
//   selectUserState,
//   (userState) => userState.status,
// );

// export const selectUserError = createSelector(
//   selectUserState,
//   (userState) => userState.error,
// );
