// src/components/PageButton.tsx

import React from 'react';
import { IconButton, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import classNames from 'classnames';
interface PageButtonProps {
    currentPage: number;
    itemsPerPage: number;
    totalCount: number;
    handlePageChange: (currentPage: number) => void;
}

const PageButton: React.FC<PageButtonProps> = ({
    currentPage,
    itemsPerPage,
    totalCount,
    handlePageChange,
}) => {
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

{
    /* <span>Page {currentPage}</span> */
    // const renderButton = (key, pageNumber, isActive, onClick) => (
    //     <button
    //         key={key}
    //         style={{
    //             backgroundColor: isActive ? 'blue' : 'white',
    //             color: isActive ? 'white' : 'black',
    //         }}
    //         onClick={onClick}
    //     >
    //         {pageNumber}
    //     </button>
    // );
    // pageButtons.push(
    //     <PageButton
    //         key={i}
    //         pageNumber={i}
    //         isActive={i === currentPage}
    //         onClick={() => handlePageChange(i)}
    //     />
    // );
    // <button onClick={() => handlePageChange(currentPage + 1)}>
    //             Next
    //         </button>
    // <button
    //             onClick={() => handlePageChange(currentPage - 1)}
    //             disabled={currentPage === 1}
    //         >
    //             Previous
    //         </button>
    // style={{
    // backgroundColor:
    // i === currentPage ? 'blue' : 'white',
    // color: i === currentPage ? 'white' : 'black',
    // }}
}
