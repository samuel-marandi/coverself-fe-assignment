import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PageButton from '../components/PageButton/PageButton';

describe('PageButton', () => {
    it('displays the correct number of page buttons', () => {
        const { container } = render(
            <PageButton
                currentPage={1}
                itemsPerPage={10}
                totalCount={100}
                handlePageChange={() => {
                    /* empty */
                }}
            />
        );
        const pageButtons = container.querySelectorAll('button');

        expect(pageButtons.length).toEqual(6);
    });

    it('displays the correct number of page buttons when the last button is selected', () => {
        const { container } = render(
            <PageButton
                currentPage={10}
                itemsPerPage={10}
                totalCount={100}
                handlePageChange={() => {
                    /* empty */
                }}
            />
        );
        const pageButtons = container.querySelectorAll('button');

        expect(pageButtons.length).toEqual(6);
    });

    it('displays the correct number of page buttons when a middle button is selected', () => {
        const { container } = render(
            <PageButton
                currentPage={5}
                itemsPerPage={10}
                totalCount={100}
                handlePageChange={() => {
                    /* empty */
                }}
            />
        );
        const pageButtons = container.querySelectorAll('button');

        expect(pageButtons.length).toEqual(9);
    });

    it('calls the handlePageChange function when a page button is clicked', () => {
        const handlePageChangeMock = jest.fn();
        const { getByText } = render(
            <PageButton
                currentPage={1}
                itemsPerPage={10}
                totalCount={100}
                handlePageChange={handlePageChangeMock}
            />
        );

        // Click the second page button
        fireEvent.click(getByText('2'));

        // The handlePageChange function should have been called with a page number of 2
        expect(handlePageChangeMock).toHaveBeenCalledWith(2);
    });
});
