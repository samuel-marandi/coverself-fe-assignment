// This component is a container which handles data fetching and error management.
// React-Table is the presentation component which implements @tanstack/react-table to display the data.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Text } from '@chakra-ui/react';
import { RootState } from '../store/rootReducer';
import { useGetAllIssuesQuery } from '../api/apiClient';
import {
    setCurrentPage,
    setItemsPerPage,
    // setSortBy,
    // setSortOrder,
} from '../store/pagination/paginationSlice';
import ReactTable from '../components/ReactTable/ReactTable';
import { ApiResponseData } from '../components/ReactTable/types';
import { ErrorMessage } from '../utils/enums/labels';

const IssuesList: React.FC = () => {
    const dispatch = useDispatch();
    const { currentPage, itemsPerPage, sortBy, sortOrder } = useSelector(
        (state: RootState) => state.paginationReducer
    );

    const { data, error, isLoading } = useGetAllIssuesQuery({
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

    if (isLoading)
        return (
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        );
    if (error) return <Text fontSize="3xl">{ErrorMessage.API_FAILURE}</Text>;

    return (
        <div>
            {data && (
                <ReactTable
                    data={data as ApiResponseData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            )}
        </div>
    );
};

export default IssuesList;
