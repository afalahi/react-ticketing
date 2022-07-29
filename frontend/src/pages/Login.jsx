/** @format */

import { useState, useEffect, useContext } from 'react';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  InputGroup,
  Button,
  InputRightElement,
  Link,
  HStack,
  useToast,
} from '@chakra-ui/react';

import authService from '../actions/authActions';
import Loading from '../components/Loading';
import AuthContext from '../Context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const { user, isLoading, dispatch } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    authService
      .login(formData)
      .then(user => {
        dispatch({ type: 'USER_LOGIN', payload: user });
        toast({
          description: `Welcome back, ${user.firstName}!`,
          status: 'success',
          duration: 2000,
          position: 'top',
        });
        if (location.state?.from) {
          navigate(location.state?.from);
        } else {
          navigate('/');
        }
      })
      .catch(error => {
        dispatch({ type: 'SET_LOADING', payload: false });
        toast({
          status: 'error',
          description: error,
          duration: 3000,
          position: 'top',
        });
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Flex minH={'20vh'} align={'center'} justify={'center'} color={'gray.500'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading
            fontSize={'4xl'}
            as={'section'}
            textAlign='center'
            color={'gray.600'}
          >
            <HStack>
              <Icon as={FaSignInAlt} /> <Text>Login</Text>
            </HStack>
          </Heading>
          <Text color={'gray.600'} fontSize={'lg'}>
            Sign In to Your Account
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}
          as={'form'}
          onSubmit={onSubmit}
        >
          <Stack width={['xxs', 'xs', 'sm']}>
            <FormControl id='email' isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type={'email'}
                name='email'
                value={email}
                onChange={onChange}
              />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={password}
                  onChange={onChange}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <Icon as={FaEye} />
                    ) : (
                      <Icon as={FaEyeSlash} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText='Signing in'
                size={'lg'}
                bg={'purple.500'}
                color={'white'}
                _hover={{ bg: 'purple.400' }}
                type={'submit'}
              >
                Sign In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have an account?{' '}
                <Link as={RouterLink} to='/register' color={'blue.400'}>
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Login;
