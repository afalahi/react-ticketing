import { useState, useEffect, useContext } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  InputGroup,
  Button,
  InputRightElement,
  FormErrorMessage,
  Link,
  useToast,
} from '@chakra-ui/react';

import Loading from '../components/Loading';
import authService from '../actions/authActions';
import AuthContext from '../Context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  //State variables
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  //this is for the Chakra-Ui password reveal icon and dynamic input type switching
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  //error state to display for form validation
  const [formError, setFormError] = useState({ ...formData, error: false });
  //destructuring state date
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const { user, isLoading, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);
  //Defining on change function to set the state with form values
  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    //validating passwords match, this should be extracted to it's own validation function
    setFormError(prev => {
      const stateObj = { ...prev, confirmPassword: '', error: false };
      switch (e.target.name) {
        case 'confirmPassword':
          if (password && e.target.value !== password) {
            stateObj[e.target.name] =
              'Password and Confirm Password do not match';
            stateObj.error = true;
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  //Submitting the data to our API with an onSubmit function
  const onSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING' });
    const userData = { ...formData };
    authService
      .register(formData)
      .then(user => {
        dispatch({ type: 'USER_REGISTER', payload: user });
        toast({
          description: `Welcome ${user.firstName}`,
          status: 'success',
          duration: 5000,
          position: 'top',
        });
        navigate('/');
      })
      .catch(error => {
        toast({
          status: 'error',
          description: error,
          duration: 5000,
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
              <Icon as={FaUser} boxSize={'8'} /> <Text>Register</Text>
            </HStack>
          </Heading>
          <Text color={'gray.600'} fontSize={'lg'}>
            Please Create an Account
          </Text>
        </Stack>
        {/* This box component is being rendered as a form with the as prop */}
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}
          as={'form'}
          onSubmit={onSubmit}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id='firstName' isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type={'text'}
                    name='firstName'
                    value={firstName}
                    onChange={onChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id='lastName' isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type={'text'}
                    name='lastName'
                    value={lastName}
                    onChange={onChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id='email' isRequired>
              <FormLabel>Enter Email</FormLabel>
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
            <FormControl
              id='confirmPassword'
              isRequired
              isInvalid={formError.confirmPassword}
            >
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={onChange}
                />

                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setConfirmShowPassword(
                        showConfirmPassword => !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <Icon as={FaEye} />
                    ) : (
                      <Icon as={FaEyeSlash} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formError.error && (
                <FormErrorMessage>{formError.confirmPassword}</FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText='Submitting'
                size={'lg'}
                bg={'purple.500'}
                color={'white'}
                _hover={{ bg: 'purple.400' }}
                type={'submit'}
                isDisabled={formError.error}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link as={RouterLink} to='/login' color={'blue.400'}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Register;
