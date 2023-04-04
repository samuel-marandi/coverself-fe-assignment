import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Issue } from '../utils/types/issueTypes';
import { IssueStatus } from '../utils/enums/status';
import ReactTable from '../components/ReactTable/ReactTable';
import { TableHeaders } from '../utils/enums/labels';

const mockIssues: Issue[] = [
    {
        id: '1',
        title: 'Issue 1',
        description: 'Description 1',
        assignedTo: 'User 1',
        dueDate: '2022-04-01T00:00:00.000Z',
        status: IssueStatus.TODO,
    },
    {
        id: '2',
        title: 'Issue 2',
        description: 'Description 2',
        assignedTo: 'User 2',
        dueDate: '2022-04-02T00:00:00.000Z',
        status: IssueStatus.IN_PROGRESS,
    },
];

describe('ReactTable', () => {
    test('renders table headers', () => {
        render(
            <ReactTable
                data={{ data: mockIssues, totalCount: mockIssues.length }}
                currentPage={1}
                itemsPerPage={10}
                onPageChange={jest.fn()}
                onItemsPerPageChange={jest.fn()}
            />
        );

        const issueHeader = screen.getByText(TableHeaders.ISSUE);

        expect(issueHeader).toBeInTheDocument();

        const descriptionHeader = screen.getByText(TableHeaders.DESCRIPTION);

        expect(descriptionHeader).toBeInTheDocument();

        const assignedToHeader = screen.getByText(TableHeaders.ASSIGNED_TO);

        expect(assignedToHeader).toBeInTheDocument();

        const dueDateHeader = screen.getByText(TableHeaders.DUE_DATE);

        expect(dueDateHeader).toBeInTheDocument();

        const statusHeader = screen.getByText(TableHeaders.STATUS);

        expect(statusHeader).toBeInTheDocument();
    });

    test('renders table data', () => {
        render(
            <ReactTable
                data={{ data: mockIssues, totalCount: mockIssues.length }}
                currentPage={1}
                itemsPerPage={10}
                onPageChange={jest.fn()}
                onItemsPerPageChange={jest.fn()}
            />
        );

        const issue1Title = screen.getByText('Issue 1');

        expect(issue1Title).toBeInTheDocument();

        const issue1Description = screen.getByText('Description 1');

        expect(issue1Description).toBeInTheDocument();

        const issue1AssignedTo = screen.getByText('User 1');

        expect(issue1AssignedTo).toBeInTheDocument();

        const issue1DueDate = screen.getByText('Apr 01, 2022');

        expect(issue1DueDate).toBeInTheDocument();

        const issue1Status = screen.getByText(IssueStatus.TODO);

        expect(issue1Status).toBeInTheDocument();

        const issue2Title = screen.getByText('Issue 2');

        expect(issue2Title).toBeInTheDocument();

        const issue2Description = screen.getByText('Description 2');

        expect(issue2Description).toBeInTheDocument();

        const issue2AssignedTo = screen.getByText('User 2');

        expect(issue2AssignedTo).toBeInTheDocument();

        const issue2DueDate = screen.getByText('Apr 02, 2022');

        expect(issue2DueDate).toBeInTheDocument();

        const issue2Status = screen.getByText(IssueStatus.IN_PROGRESS);

        expect(issue2Status).toBeInTheDocument();
    });
});
