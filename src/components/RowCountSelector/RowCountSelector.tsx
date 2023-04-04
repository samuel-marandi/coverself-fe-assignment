// src/components/RowCountSelector.tsx

import React from 'react';
import { Title } from '../../utils/enums/labels';
import { Box, Text, Select } from '@chakra-ui/react';

interface RowCountSelectorProps {
    itemsPerPage: number;
    handleItemsPerPageChange: (noOfItems: number) => void;
}

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
            <Select
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
            </Select>
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
