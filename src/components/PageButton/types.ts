export interface PageButtonProps {
    currentPage: number;
    itemsPerPage: number;
    totalCount: number;
    handlePageChange: (currentPage: number) => void;
}
