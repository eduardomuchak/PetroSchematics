import { Flex, Heading } from '@chakra-ui/react';

import ColorModeToggle from 'components/ColorModeToggle';

export function Homepage() {
  return (
    <Flex p={5} direction={'column'} minH={'100vh'}>
      <Flex align={'center'} justify={'end'}>
        <ColorModeToggle />
      </Flex>
      <Flex align={'center'} justify={'center'} flex={1} direction={'column'}>
        <Heading>DaaS</Heading>
      </Flex>
    </Flex>
  );
}
