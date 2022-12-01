import { Button, Flex, Heading, Input } from '@chakra-ui/react';

import ColorModeToggle from 'components/ColorModeToggle';

export function StyleGuide() {
  return (
    <Flex p={5} align={'center'} justify={'center'} flex={1} gap={5} direction={'column'} minH={'100vh'}>
      <Flex align={'center'} justify={'end'}>
        <ColorModeToggle />
      </Flex>
      <Flex direction={'column'} align={'center'} justify={'center'} gap={5}>
        <Heading>Botões</Heading>
        <Flex gap={5}>
          <Flex direction={'column'} gap={5}>
            <Button variant={'origemBlueSolid'}>Solid</Button>
            <Button variant={'origemBlueOutline'}>Outline</Button>
            <Button variant={'origemBlueGhost'}>Ghost</Button>
          </Flex>
          <Flex direction={'column'} gap={5}>
            <Button variant={'origemRedSolid'}>Solid</Button>
            <Button variant={'origemRedOutline'}>Outline</Button>
            <Button variant={'origemRedGhost'}>Ghost</Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction={'column'} align={'center'} justify={'center'} gap={5}>
        <Heading>Input</Heading>
        <Input variant={'origem'} placeholder={'Origem'} />
      </Flex>
    </Flex>
  );
}
