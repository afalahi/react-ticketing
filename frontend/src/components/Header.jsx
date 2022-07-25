import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  HStack,
  Link as NavLink,
  Flex,
  ButtonGroup,
  Button,
  Text,
  useBreakpointValue,
  Container,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Center,
  Avatar,
} from '@chakra-ui/react';
import { FaSignInAlt, FaSignOutAlt, FaUserAlt, FaUser } from 'react-icons/fa';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import authService from '../features/auth/authService';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  //don't use hooks in conditionals rule
  const loginButtonColor = useColorModeValue('gray.500', 'white');

  const onLogout = e => {
    authService.logout();
    dispatch({ type: 'USER_LOGOUT' });
    navigate('/');
  };
  return (
    <Box as='section' pb={{ base: '4', md: '10' }}>
      <Box
        as='nav'
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container maxW={'7xl'}>
          <Flex
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            justify={'space-between'}
            flex='1'
            align='center'
            minWidth={'max-content'}
            h={16}
          >
            <HStack spacing='8' justify={'space-between'}>
              <NavLink
                as={RouterLink}
                to='/'
                _hover={{ textDecoration: 'none' }}
              >
                <Text>Support Desk</Text>
              </NavLink>
              {/* <ButtonGroup variant={'link'}>
                {['new'].map(item => (
                  <Button
                    key={item}
                    as={RouterLink}
                    to={`/tickets/${item}`}
                    textTransform={'capitalize'}
                    p={'6'}
                    borderBottom={'2px solid transparent'}
                    borderRadius='0'
                    _hover={{
                      textDecoration: 'none',
                      color: 'purple.400',
                      borderBottom: '2px solid',
                      borderRadius: '0',
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </ButtonGroup> */}
            </HStack>
            <ButtonGroup gap={2} p={4}>
              <ColorModeSwitcher />
              {user ? (
                <Menu>
                  <MenuButton
                    as={'button'}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minw={0}
                  >
                    <HStack>
                      <Avatar
                        size={'sm'}
                        src={
                          'https://avatars.dicebear.com/api/male/username.svg'
                        }
                      />
                    </HStack>
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    {/* <br /> */}
                    <Center>
                      <Avatar
                        size={'lg'}
                        src={
                          'https://avatars.dicebear.com/api/male/username.svg'
                        }
                      />
                    </Center>
                    {/* <br /> */}
                    <Center>
                      <p>
                        {user.firstName} {user.lastName}
                      </p>
                    </Center>
                    {/* <br /> */}
                    <MenuDivider />
                    <MenuItem onClick={onLogout} icon={<FaSignOutAlt />}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Button
                    variant={'outline'}
                    colorScheme={'blackAlpha'}
                    color={loginButtonColor}
                    as={RouterLink}
                    to='/login'
                    leftIcon={<FaSignInAlt />}
                  >
                    Login
                  </Button>
                  <Button
                    bg={'purple.500'}
                    color={'white'}
                    _hover={{ bg: 'purple.400' }}
                    as={RouterLink}
                    to='/register'
                    leftIcon={<FaUser />}
                  >
                    Register
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
