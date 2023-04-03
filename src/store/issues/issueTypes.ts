// src/store/user/userTypes.ts

import { IssueStatus } from '../../utils/enums/status';

export interface Issue {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    status: IssueStatus;
}

export interface IssueState {
    issues: Issue[];
    selectedPage: number;
    pageSize: number;
    totalCount: number;
    error: string | null;
}
