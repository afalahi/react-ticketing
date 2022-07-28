/** @format */

import { ButtonGroup, Button } from '@chakra-ui/react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <ButtonGroup gap={2} p={4} display={'flex'} flexWrap={'wrap'}>
      <Button
        variant={'outline'}
        colorScheme={'blackAlpha'}
        color={['white', 'white', 'gray.500', 'gray.500']}
        as={RouterLink}
        to='/login'
        leftIcon={<FaSignInAlt />}
      >
        Login
      </Button>
      <Button
        bg={['white', 'white', 'purple.500', 'purple.500']}
        color={['purple.500', 'purple.500', 'white', 'white']}
        _hover={{
          bg: ['whiteAlpha.800', 'whiteAlpha.800', 'purple.400', 'purple.400'],
        }}
        as={RouterLink}
        to='/register'
        leftIcon={<FaUser />}
      >
        Register
      </Button>
    </ButtonGroup>
  );
};

export default AuthButtons;
