/** @format */

import { IconButton, Box } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

const MenuToggle = ({ isOpen, onToggle }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }}>
      <IconButton
        onClick={onToggle}
        icon={
          isOpen ? <CloseIcon w='4' h='4' /> : <HamburgerIcon w='6' h='6' />
        }
        variant={'ghost'}
        aria-label={'Toggle Navigation'}
      />
    </Box>
  );
};

export default MenuToggle;
