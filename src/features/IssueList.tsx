// src/components/IssuesList.tsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { useGetAllIssuesQuery } from '../api/apiClient';
import {
    setCurrentPage,
    setItemsPerPage,
    setSortBy,
    setSortOrder,
} from '../store/pagination/paginationSlice';
import ReactTable from '../components/ReactTable/ReactTable';

const IssuesList: React.FC = () => {
    const dispatch = useDispatch();
    const { currentPage, itemsPerPage, sortBy, sortOrder } = useSelector(
        (state: RootState) => state.paginationReducer
    );

    const {
        data: issues,
        error,
        isLoading,
    } = useGetAllIssuesQuery({
        currentPage,
        itemsPerPage,
        sortBy,
        sortOrder,
    });

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const handleItemsPerPageChange = (items: number) => {
        dispatch(setItemsPerPage(items));
    };

    const handleSortByChange = (field: string) => {
        dispatch(setSortBy(field));
    };

    const handleSortOrderChange = (order: 'asc' | 'desc') => {
        dispatch(setSortOrder(order));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <ReactTable
                issues={issues}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
            />
        </div>
    );
};

export default IssuesList;
