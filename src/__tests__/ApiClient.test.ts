import { useGetAllIssuesQuery } from '../api/apiClient';

jest.mock('../api/apiClient', () => ({
    __esModule: true,
    useGetAllIssuesQuery: jest.fn(),
}));

describe('useGetAllIssuesQuery', () => {
    it('returns mocked data', async () => {
        const mockedResponse = {
            data: [
                { id: 1, title: 'Issue 1' },
                { id: 2, title: 'Issue 2' },
                { id: 3, title: 'Issue 3' },
            ],
            totalCount: 3,
        };

        // mock the implementation of `useGetAllIssuesQuery`
        (useGetAllIssuesQuery as jest.Mock).mockImplementation(() => ({
            data: mockedResponse,
            error: null,
            isLoading: false,
            isFetching: false,
            isSuccess: true,
            refetch: jest.fn(),
        }));

        // call the `useGetAllIssuesQuery` hook as usual
        const { data, error, isLoading, isFetching, isSuccess } =
            useGetAllIssuesQuery({
                currentPage: 1,
                itemsPerPage: 10,
                sortBy: 'title',
                sortOrder: 'asc',
            });

        // check that the data returned by the hook matches the mocked data
        expect(data).toEqual({
            data: mockedResponse.data,
            totalCount: mockedResponse.data.length,
        });
        expect(error).toBeNull();
        expect(isLoading).toBe(false);
        expect(isFetching).toBe(false);
        expect(isSuccess).toBe(true);
    });
});
