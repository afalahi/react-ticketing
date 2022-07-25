import { Spinner, VStack, Container, Box } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box>
      <Container>
        <VStack>
          <Box minH={'40vh'}></Box>
          <Spinner
            thickness='5px'
            emptyColor='gray.200'
            color='purple.500'
            size={'xl'}
            speed='0.65s'
          />
        </VStack>
      </Container>
    </Box>
  );
};
export default Loading;
