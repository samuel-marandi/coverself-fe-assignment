import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useGetAllIssuesQuery } from '../api/apiClient';
import IssuesList from '../features/IssueList';
import { ErrorMessage } from '../utils/enums/labels';

// create a mock store
const mockStore = configureStore([]);

// mock the useGetAllIssuesQuery hook
jest.mock('../api/apiClient', () => ({
    useGetAllIssuesQuery: jest.fn(),
}));

describe('IssuesList component', () => {
    it('displays a loading spinner when the data is loading', () => {
        // set up the mock store state
        const store = mockStore({
            paginationReducer: {
                currentPage: 1,
                itemsPerPage: 10,
                sortBy: 'title',
                sortOrder: 'asc',
            },
        });

        // set up the mock return value for useGetAllIssuesQuery
        (useGetAllIssuesQuery as jest.Mock).mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
        });

        // render the component with the mock store provider
        render(
            <Provider store={store}>
                <IssuesList />
            </Provider>
        );

        // check that the loading spinner is displayed
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays an error message when the API call fails', () => {
        // set up the mock store state
        const store = mockStore({
            paginationReducer: {
                currentPage: 1,
                itemsPerPage: 10,
                sortBy: 'title',
                sortOrder: 'asc',
            },
        });

        // set up the mock return value for useGetAllIssuesQuery
        (useGetAllIssuesQuery as jest.Mock).mockReturnValue({
            data: null,
            error: { message: 'API call failed' },
            isLoading: false,
        });

        // render the component with the mock store provider
        render(
            <Provider store={store}>
                <IssuesList />
            </Provider>
        );

        // check that the error message is displayed
        expect(screen.getByText(ErrorMessage.API_FAILURE)).toBeInTheDocument();
    });

    it('displays the issues list when the data is loaded', () => {
        // set up the mock store state
        const store = mockStore({
            paginationReducer: {
                currentPage: 1,
                itemsPerPage: 10,
                sortBy: 'title',
                sortOrder: 'asc',
            },
        });

        // set up the mock return value for useGetAllIssuesQuery
        (useGetAllIssuesQuery as jest.Mock).mockReturnValue({
            data: {
                data: [
                    {
                        id: '8edaa9c1aeae8cdc97e10ce4',
                        title: 'Movies bypassing fiji',
                        description:
                            'Architect south hydrogen invoice orchestrator bicycle if',
                        assignedTo: 'Brittany Hahn',
                        dueDate: '2023-04-26T03:17:27.781Z',
                        status: 'TODO',
                    },
                    {
                        id: '560db5bbd00d9e58f41ef8a1',
                        title: 'Northeast steel southwest',
                        description: 'Hmph fluke json toys slate male new',
                        assignedTo: 'Mrs. Emilio Aufderhar',
                        dueDate: '2024-03-30T09:31:56.815Z',
                        status: 'COMPLETED',
                    },
                    {
                        id: '519ab097ade8969aa9f4f3d3',
                        title: 'Angola almost cisgender',
                        description: 'Black account ocr martin zero health bmw',
                        assignedTo: 'Cecelia Satterfield',
                        dueDate: '2023-06-09T21:56:57.652Z',
                        status: 'IN_PROGRESS',
                    },
                ],
                totalCount: 3,
            },
            error: null,
            isLoading: false,
        });

        // render the component with the mock store provider
        render(
            <Provider store={store}>
                <IssuesList />
            </Provider>
        );

        // check that the issues list is displayed
        expect(screen.getByText('Movies bypassing fiji')).toBeInTheDocument();
        expect(
            screen.getByText('Northeast steel southwest')
        ).toBeInTheDocument();
        expect(screen.getByText('Angola almost cisgender')).toBeInTheDocument();
    });
});
