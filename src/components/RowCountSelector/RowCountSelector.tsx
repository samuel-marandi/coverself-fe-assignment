// src/components/RowCountSelector.tsx

import React from 'react';
import { Title } from '../../utils/enums/labels';
import {
    Box,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
interface RowCountSelectorProps {
    itemsPerPage: number;
    handleItemsPerPageChange: (noOfItems: number) => void;
}

const PageSize = [5, 10, 25, 50, 100];

const RowCountSelector: React.FC<RowCountSelectorProps> = ({
    itemsPerPage,
    handleItemsPerPageChange,
}) => {
    return (
        <Box mr="1" display="flex">
            <Text
                display="flex"
                alignItems="center"
                width="250px"
                justifyContent="flex-end"
                pr="5"
            >
                {Title.TABLE_ROW_SELECTOR}
            </Text>
            <Menu placement="bottom">
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            isActive={isOpen}
                            as={Button}
                            rightIcon={
                                isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
                            }
                        >
                            {itemsPerPage}
                        </MenuButton>
                        <MenuList>
                            {PageSize.map(size => (
                                <MenuItem
                                    key={size} // providing size as here since they are all unique anyway
                                    bg={
                                        size === itemsPerPage
                                            ? '#d9d9d9'
                                            : 'white'
                                    }
                                    borderRadius="0"
                                    onClick={() =>
                                        handleItemsPerPageChange(size)
                                    }
                                >
                                    {size}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </>
                )}
            </Menu>
            {/* <Select
                width="80px"
                cursor="pointer"
                value={itemsPerPage}
                onChange={e =>
                    handleItemsPerPageChange(parseInt(e.target.value))
                }
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </Select> */}
        </Box>
    );
};

export default RowCountSelector;

// <select
//                     value={itemsPerPage}
//                     onChange={e =>
//                         handleItemsPerPageChange(parseInt(e.target.value))
//                     }
//                 >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="25">25</option>
//                     <option value="50">50</option>
//                     <option value="100">100</option>
//                 </select>
{
    /* <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Actions
                    </MenuButton> */
}
{
    /* <MenuList>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="25">25</MenuItem>
                        <MenuItem value="50">50</MenuItem>
                        <MenuItem value="100">100</MenuItem>
                    </MenuList> */
}
