import { Button, Flex, Heading } from '@chakra-ui/react';

export function StyleGuide() {
  return (
    <Flex p={5} align={'center'} justify={'center'} flex={1} gap={5} direction={'column'} minH={'100vh'}>
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
  );
}
