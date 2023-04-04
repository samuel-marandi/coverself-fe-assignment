// src/store/pagination/paginationSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

const initialState: PaginationState = {
    currentPage: 1,
    itemsPerPage: 10,
    sortBy: 'dueDate',
    sortOrder: 'asc',
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.sortOrder = action.payload;
        },
    },
});

export const { setCurrentPage, setItemsPerPage, setSortBy, setSortOrder } =
    paginationSlice.actions;
export default paginationSlice.reducer;
