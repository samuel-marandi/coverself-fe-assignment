// src/store/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import { apiClient } from '../api/apiClient';
import paginationReducer from './pagination/paginationSlice';

const rootReducer = combineReducers({
    paginationReducer,
    [apiClient.reducerPath]: apiClient.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
