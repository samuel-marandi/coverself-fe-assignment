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

interface ReactTableProps {
    data: Issue[];
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

const ReactTable: React.FC<ReactTableProps> = ({
    issues,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}) => {
    console.log({ issues });

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

    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        });

    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
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
                <button onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ReactTable;

// return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map(
//           (headerGroup: {
//             getHeaderGroupProps: () => JSX.IntrinsicAttributes &
//               React.ClassAttributes<HTMLTableRowElement> &
//               React.HTMLAttributes<HTMLTableRowElement>;
//             headers: any[];
//           }) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           )
//         )}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map(
//           (row: {
//             getRowProps: () => JSX.IntrinsicAttributes &
//               React.ClassAttributes<HTMLTableRowElement> &
//               React.HTMLAttributes<HTMLTableRowElement>;
//             cells: any[];
//           }) => {
//             prepareRow(row);

//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                   );
//                 })}
//               </tr>
//             );
//           }
//         )}
//       </tbody>
//     </table>
//   );

// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

// import './index.css'

// import {
//   PaginationState,
//   useReactTable,
//   getCoreRowModel,
//   ColumnDef,
//   flexRender,
// } from '@tanstack/react-table'

// //

// import { fetchData, Person } from './fetchData'

// const queryClient = new QueryClient()

// function App() {
//   const rerender = React.useReducer(() => ({}), {})[1]

//   const columns = React.useMemo<ColumnDef<Person>[]>(
//     () => [
//       {
//         header: 'Name',
//         footer: props => props.column.id,
//         columns: [
//           {
//             accessorKey: 'firstName',
//             cell: info => info.getValue(),
//             footer: props => props.column.id,
//           },
//           {
//             accessorFn: row => row.lastName,
//             id: 'lastName',
//             cell: info => info.getValue(),
//             header: () => <span>Last Name</span>,
//             footer: props => props.column.id,
//           },
//         ],
//       },
//       {
//         header: 'Info',
//         footer: props => props.column.id,
//         columns: [
//           {
//             accessorKey: 'age',
//             header: () => 'Age',
//             footer: props => props.column.id,
//           },
//           {
//             header: 'More Info',
//             columns: [
//               {
//                 accessorKey: 'visits',
//                 header: () => <span>Visits</span>,
//                 footer: props => props.column.id,
//               },
//               {
//                 accessorKey: 'status',
//                 header: 'Status',
//                 footer: props => props.column.id,
//               },
//               {
//                 accessorKey: 'progress',
//                 header: 'Profile Progress',
//                 footer: props => props.column.id,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     []
//   )

//   const [{ pageIndex, pageSize }, setPagination] =
//     React.useState<PaginationState>({
//       pageIndex: 0,
//       pageSize: 10,
//     })

//   const fetchDataOptions = {
//     pageIndex,
//     pageSize,
//   }

//   const dataQuery = useQuery(
//     ['data', fetchDataOptions],
//     () => fetchData(fetchDataOptions),
//     { keepPreviousData: true }
//   )

//   const defaultData = React.useMemo(() => [], [])

//   const pagination = React.useMemo(
//     () => ({
//       pageIndex,
//       pageSize,
//     }),
//     [pageIndex, pageSize]
//   )

//   const table = useReactTable({
//     data: dataQuery.data?.rows ?? defaultData,
//     columns,
//     pageCount: dataQuery.data?.pageCount ?? -1,
//     state: {
//       pagination,
//     },
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     manualPagination: true,
//     // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
//     debugTable: true,
//   })

//   return (
//     <div className="p-2">
//       <div className="h-2" />
//       <table>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => {
//                 return (
//                   <th key={header.id} colSpan={header.colSpan}>
//                     {header.isPlaceholder ? null : (
//                       <div>
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                       </div>
//                     )}
//                   </th>
//                 )
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => {
//             return (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map(cell => {
//                   return (
//                     <td key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   )
//                 })}
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//       <div className="h-2" />
//       <div className="flex items-center gap-2">
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(0)}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {'<<'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {'<'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           {'>'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//           disabled={!table.getCanNextPage()}
//         >
//           {'>>'}
//         </button>
//         <span className="flex items-center gap-1">
//           <div>Page</div>
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of{' '}
//             {table.getPageCount()}
//           </strong>
//         </span>
//         <span className="flex items-center gap-1">
//           | Go to page:
//           <input
//             type="number"
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0
//               table.setPageIndex(page)
//             }}
//             className="border p-1 rounded w-16"
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={e => {
//             table.setPageSize(Number(e.target.value))
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//         {dataQuery.isFetching ? 'Loading...' : null}
//       </div>
//       <div>{table.getRowModel().rows.length} Rows</div>
//       <div>
//         <button onClick={() => rerender()}>Force Rerender</button>
//       </div>
//       <pre>{JSON.stringify(pagination, null, 2)}</pre>
//     </div>
//   )
// }

// const rootElement = document.getElementById('root')
// if (!rootElement) throw new Error('Failed to find the root element')

// ReactDOM.createRoot(rootElement).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </React.StrictMode>
// )
