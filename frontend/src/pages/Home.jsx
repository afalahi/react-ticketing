/** @format */

import { Box, Button, Center, Container, VStack } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box>
      <Center>
        <VStack
          spacing={5}
          justifyContent='center'
          justifySelf={'center'}
          justifyItems='center'
        >
          <Box minH={'30vh'} />
          <Box mb={5}>
            <Button w={['30vh', '40vh', '50vh']} h={['5vh', '3vh', '5vh']}>
              New Ticket
            </Button>
          </Box>
          <Box>
            <Button w={['30vh', '40vh', '50vh']} h={'5vh'}>
              View Your Tickets
            </Button>
          </Box>
        </VStack>
      </Center>
    </Box>
  );
};
export default Home;
