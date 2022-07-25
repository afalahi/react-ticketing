import { Box, Button, Center, Container, VStack } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box>
      <Center>
        <VStack>
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
