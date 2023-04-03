// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { apiClient } from '../api/apiClient';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiClient.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
