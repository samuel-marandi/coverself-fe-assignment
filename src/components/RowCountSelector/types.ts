// Defining the types used with RowCountSelector here. These types are not used anywhere else.
export interface RowCountSelectorProps {
    itemsPerPage: number;
    handleItemsPerPageChange: (noOfItems: number) => void;
}

export const RowSize: number[] = [5, 10, 25, 50, 100];
