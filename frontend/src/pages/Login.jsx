import { useState } from 'react';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
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
} from '@chakra-ui/react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState({ ...formData, error: false });
  const { email, password } = formData;

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // setError(prev => {
    //   const stateObj = { ...prev, confirmPassword: '', error: false };
    //   switch (e.target.name) {
    //     case 'confirmPassword':
    //       if (password && e.target.value !== password) {
    //         stateObj[e.target.name] =
    //           'Password and Confirm Password do not match';
    //         stateObj.error = true;
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    //   return stateObj;
    // });
  };

  const onSubmit = e => {
    e.preventDefault();
  };
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
            <Icon as={FaSignInAlt} boxSize='8' /> Login
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
          width={'md'}
        >
          <Stack spacing={4} width={'sm'}>
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
