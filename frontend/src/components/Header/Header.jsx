/** @format */
import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Container,
  useColorModeValue,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';

import Logo from './Logo';
import ColorModeSwitcher from '../ColorModeSwitcher';
import MenuToggle from './MenuToggle';
import ProfileIcon from './ProfileIcon';
import AuthButtons from './AuthButtons';
import AuthContext from '../../Context/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as='section' pb={{ base: '4', md: '10' }}>
      <Box
        as='nav'
        borderBottom={1}
        borderStyle={!isOpen ? 'solid' : 'none'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        bg={['purple.500', 'purple.500', 'transparent', 'transparent']}
        color={['white', 'white', 'gray.600', 'gray.600']}
      >
        <Container maxW={'7xl'}>
          <Flex justify={'space-between'} wrap='wrap' align='center' w='100%'>
            <Logo />
            <MenuToggle isOpen={isOpen} onToggle={onToggle} />
            <Box
              display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
              flexBasis={{ base: '100%', md: 'auto' }}
            >
              <Stack
                spacing={8}
                align={'center'}
                justify={{
                  base: 'center',
                  md: 'space-between',
                  lg: 'flex-end',
                }}
                direction={{ base: 'column', md: 'row' }}
                pt={3}
                pb={3}
              >
                <ColorModeSwitcher />
                {user ? <ProfileIcon /> : <AuthButtons />}
              </Stack>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
