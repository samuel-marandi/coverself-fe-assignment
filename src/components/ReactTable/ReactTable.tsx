import React from 'react';
import {
    ColumnDef,
    RowModel,
    Table,
    useReactTable,
    getCoreRowModel,
    flexRender,
    PaginationState,
    getPaginationRowModel,
} from '@tanstack/react-table';
import { Issue } from '../../store/issues/issueTypes';
import PageButton from '../PageButton/PageButton';

interface ApiResponseData {
    data: Issue[];
    totalCount: number;
}

interface ReactTableProps {
    data: ApiResponseData;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

const ReactTable: React.FC<ReactTableProps> = ({
    data,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}) => {
    const { data: issues, totalCount } = data;

    console.log({ issues, totalCount });

    const columns = React.useMemo<ColumnDef<Issue>[]>(
        () => [
            {
                header: 'Issue',
                accessorKey: 'title',
            },
            {
                header: 'Short Description',
                accessorKey: 'description',
            },
            {
                header: 'Assigned To',
                accessorKey: 'assignedTo',
            },
            {
                header: 'Due Date',
                accessorKey: 'dueDate',
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
        ],
        []
    );

    const table = useReactTable({
        data: issues,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // pageCount: data?.pageCount ?? -1,
        // state: {
        //     pagination,
        // },
        // onPaginationChange: setPagination,
        // manualPagination: true,
        // debugTable: true,
    });

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const handleItemsPerPageChange = (items: number) => {
        onItemsPerPageChange(items);
        onPageChange(1);
    };

    // Add this function inside your ReactTable component
    const renderPageButtons = () => {
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        const pageButtons = [];

        const visibleRange = 4; // Change this value to control the number of visible page buttons

        let lastButtonIndex = 0;

        for (let i = 1; i <= totalPages; i++) {
            const shouldDisplay =
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - visibleRange / 2 &&
                    i <= currentPage + visibleRange / 2);

            if (shouldDisplay) {
                // Add "..." before the current button if it's not adjacent to the last visible button
                if (lastButtonIndex !== 0 && i !== lastButtonIndex + 1) {
                    pageButtons.push(<span key={`ellipsis-${i}`}>...</span>);
                }

                pageButtons.push(
                    <PageButton
                        key={i}
                        pageNumber={i}
                        isActive={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    />
                );

                lastButtonIndex = i;
            }
        }

        return pageButtons;
    };

    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <label>
                    Items per page:{' '}
                    <select
                        value={itemsPerPage}
                        onChange={e =>
                            handleItemsPerPageChange(parseInt(e.target.value))
                        }
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </label>
            </div>
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage}</span>
                {renderPageButtons()}
                <button onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ReactTable;