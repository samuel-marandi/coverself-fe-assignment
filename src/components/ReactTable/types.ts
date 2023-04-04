// Defining the types used with ReactTable here. These types are not used anywhere else in the application.

import { Issue } from '../../utils/types/issueTypes';

export interface ApiResponseData {
    data: Issue[];
    totalCount: number;
}

export interface ReactTableProps {
    data: ApiResponseData;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}
