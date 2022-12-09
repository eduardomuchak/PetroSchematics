import { Box } from '@chakra-ui/react';

function NavIconBar() {
  return (
    <Box as="nav" backgroundColor={'#EDF2F7'} w={'88px'} minH="100vh" position={'fixed'}>
      <Box mt={'152px'} p={4} minH={'79vh'} overflowY={'auto'}></Box>
    </Box>
  );
}

export default NavIconBar;
