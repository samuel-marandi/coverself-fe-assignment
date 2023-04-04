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
import { RowSize, RowCountSelectorProps } from './types';

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
                            {RowSize.map(size => (
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
        </Box>
    );
};

export default RowCountSelector;
