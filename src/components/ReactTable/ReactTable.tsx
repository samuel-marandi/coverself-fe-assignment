import React, { useMemo } from 'react';
import {
    Box,
    Badge,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Issue } from '../../utils/types/issueTypes';
import { IssueStatus } from '../../utils/enums/status';
import { ReactTableProps } from './types';
import { TableHeaders } from '../../utils/enums/labels';
import PageButton from '../PageButton/PageButton';
import RowCountSelector from '../RowCountSelector/RowCountSelector';
import classNames from 'classnames';

const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

const ReactTable: React.FC<ReactTableProps> = ({
    data,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}) => {
    const { data: issues, totalCount } = data;

    const columns = useMemo<ColumnDef<Issue>[]>(
        () => [
            {
                header: TableHeaders.ISSUE,
                accessorKey: 'title',
            },
            {
                header: TableHeaders.DESCRIPTION,
                accessorKey: 'description',
            },
            {
                header: TableHeaders.ASSIGNED_TO,
                accessorKey: 'assignedTo',
            },
            {
                header: TableHeaders.DUE_DATE,
                accessorKey: 'dueDate',
                cell: ({ row }) =>
                    formattedDate.format(new Date(row.original.dueDate)),
            },
            {
                header: TableHeaders.STATUS,
                accessorKey: 'status',
                cell: ({ row }) => (
                    <Badge
                        colorScheme={classNames({
                            green:
                                row.original.status === IssueStatus.COMPLETED,
                            yellow:
                                row.original.status === IssueStatus.IN_PROGRESS,
                            gray: row.original.status === IssueStatus.TODO,
                        })}
                    >
                        {row.original.status}
                    </Badge>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: issues,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const handleItemsPerPageChange = (items: number) => {
        onItemsPerPageChange(items);
        onPageChange(1);
    };

    return (
        <Box>
            <Box
                pl="2"
                pr="2"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
            >
                <TableContainer>
                    <Table size="md" variant="simple">
                        <Thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <Th key={header.id}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody>
                            {table.getRowModel().rows.map(row => {
                                return (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <Td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </Td>
                                            );
                                        })}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Box display="flex" justifyContent="flex-end" mt="5" pt="5" pb="5">
                <RowCountSelector
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                />
                <PageButton
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalCount={totalCount}
                    handlePageChange={handlePageChange}
                />
            </Box>
        </Box>
    );
};

export default ReactTable;
