import { Flex, Heading } from '@chakra-ui/react';

import ColorModeToggle from 'components/ColorModeToggle';

export function Aprovacaopage() {
  return (
    <Flex p={5} direction={'column'} minH={'100vh'}>
      <Flex align={'center'} justify={'end'}>
        <ColorModeToggle />
      </Flex>
      <Flex align={'center'} justify={'center'} flex={1}>
        <Heading>Aprovacao</Heading>
      </Flex>
    </Flex>
  );
}
