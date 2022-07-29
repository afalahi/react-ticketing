/** @format */

import { Box, Button, Center, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

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
          <Box minH={'35vh'} />
          <Box mb={5}>
            <Button
              w={['30vh', '40vh', '50vh']}
              h={['8vh', '8vh', '5vh', '5vh']}
              as={RouterLink}
              to='/tickets/new'
            >
              New Ticket
            </Button>
          </Box>
          <Box>
            <Button
              w={['30vh', '40vh', '50vh']}
              h={['8vh', '8vh', '5vh', '5vh']}
              as={RouterLink}
              to='/tickets'
            >
              View Your Tickets
            </Button>
          </Box>
        </VStack>
      </Center>
    </Box>
  );
};
export default Home;
