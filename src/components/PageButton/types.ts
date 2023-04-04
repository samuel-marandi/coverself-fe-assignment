// Defining the types used with PageButtonProps here. These types are not used anywhere else.

export interface PageButtonProps {
    currentPage: number;
    itemsPerPage: number;
    totalCount: number;
    handlePageChange: (currentPage: number) => void;
}
