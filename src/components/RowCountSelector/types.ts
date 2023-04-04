export interface RowCountSelectorProps {
    itemsPerPage: number;
    handleItemsPerPageChange: (noOfItems: number) => void;
}

export const PageSize: number[] = [5, 10, 25, 50, 100];
