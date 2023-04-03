// src/components/PageButton.tsx

import React from 'react';

interface PageButtonProps {
    pageNumber: number;
    isActive: boolean;
    onClick: () => void;
}

const PageButton: React.FC<PageButtonProps> = ({
    pageNumber,
    isActive,
    onClick,
}) => {
    return (
        <button
            style={{
                backgroundColor: isActive ? 'blue' : 'white',
                color: isActive ? 'white' : 'black',
            }}
            onClick={onClick}
        >
            {pageNumber}
        </button>
    );
};

export default PageButton;
