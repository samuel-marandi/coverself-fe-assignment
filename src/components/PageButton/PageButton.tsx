// src/components/PageButton.tsx

import React from 'react';
import { IconButton, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import classNames from 'classnames';
import { PageButtonProps } from './types';

const PageButton: React.FC<PageButtonProps> = ({
    currentPage,
    itemsPerPage,
    totalCount,
    handlePageChange,
}) => {
    const shouldDisplayPageButton = (
        pageIndex: number,
        currentPage: number,
        visibleRange: number,
        totalPages: number
    ) => {
        const isStartOrEnd = pageIndex === 1 || pageIndex === totalPages;
        const isInRange =
            pageIndex >= currentPage - visibleRange / 2 &&
            pageIndex <= currentPage + visibleRange / 2;
        const shouldDisplay = isStartOrEnd || isInRange;

        return shouldDisplay;
    };

    const renderPageButtons = () => {
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        const pageButtons: JSX.Element[] = [];

        // Change this value to control the number of visible page buttons
        const visibleRange = 4;

        let lastButtonIndex = 0;

        for (let i = 1; i <= totalPages; i++) {
            const shouldDisplay = shouldDisplayPageButton(
                i,
                currentPage,
                visibleRange,
                totalPages
            );

            if (shouldDisplay) {
                // Add "..." before the current button if it's not adjacent to the last visible button
                if (lastButtonIndex !== 0 && i !== lastButtonIndex + 1) {
                    pageButtons.push(<span key={`ellipsis-${i}`}>...</span>);
                }

                pageButtons.push(
                    <Button
                        ml="1"
                        mr="1"
                        outline="none"
                        colorScheme={classNames({
                            blue: i === currentPage,
                            gray: i !== currentPage,
                        })}
                        key={i}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </Button>
                );

                lastButtonIndex = i;
            }
        }

        return pageButtons;
    };

    return (
        <div>
            <IconButton
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous"
                icon={<ChevronLeftIcon />}
            />

            {renderPageButtons()}
            <IconButton
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next"
                icon={<ChevronRightIcon />}
            />
        </div>
    );
};

export default PageButton;
