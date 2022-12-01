import { Box, Flex } from '@chakra-ui/react';

function ContainerPagina({ children }: any) {
  return (
    <Flex w={'auto'} align="center" justify="center" bg={'#EDF2F7'}>
      <Box
        py={{ base: '6', sm: '6' }}
        px={{ base: '6', sm: '6' }}
        w={'100%'}
        bg={'white'}
        borderRadius={{ base: 'xl', sm: 'xl' }}
      >
        {children}
      </Box>
    </Flex>
  );
}

export default ContainerPagina;
