import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import RowCountSelector from '../components/RowCountSelector/RowCountSelector';
import {
    RowCountSelectorProps,
    RowSize,
} from '../components/RowCountSelector/types';

describe('RowCountSelector', () => {
    const handleItemsPerPageChange = jest.fn();

    const renderRowCountSelector = (
        props: RowCountSelectorProps
    ): RenderResult => {
        return render(<RowCountSelector {...props} />);
    };

    it('should render the component', () => {
        const { getByText } = renderRowCountSelector({
            itemsPerPage: 10,
            handleItemsPerPageChange,
        });

        expect(getByText('Rows per page:')).toBeInTheDocument();
    });

    it('should show the menu when clicked', async () => {
        const { getByRole, findAllByRole } = renderRowCountSelector({
            itemsPerPage: 10,
            handleItemsPerPageChange,
        });

        const button = getByRole('button');

        fireEvent.click(button);

        const menu = await findAllByRole('menuitem');

        expect(menu.length).toBe(RowSize.length);
    });

    it('should call the handleItemsPerPageChange function when an option is selected', () => {
        const { getByRole, getByText } = renderRowCountSelector({
            itemsPerPage: 10,
            handleItemsPerPageChange,
        });

        const button = getByRole('button');

        fireEvent.click(button);

        const option = getByText('25');

        fireEvent.click(option);

        expect(handleItemsPerPageChange).toHaveBeenCalledWith(25);
    });
});
