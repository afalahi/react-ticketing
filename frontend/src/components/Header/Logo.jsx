/** @format */
import { Box, Link as NavLink, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Logo = () => {
  return (
    <Box>
      <NavLink as={RouterLink} to='/' _hover={{ textDecoration: 'none' }}>
        <Text>Support Desk</Text>
      </NavLink>
    </Box>
  );
};

export default Logo;
