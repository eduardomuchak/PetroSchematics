import { FiTrash } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';

import { Button, Flex, Heading, IconButton, Input } from '@chakra-ui/react';

// import ColorModeToggle from 'components/ColorModeToggle';

export function StyleGuide() {
  return (
    <Flex p={5} align={'center'} justify={'center'} flex={1} gap={5} direction={'column'} minH={'100vh'}>
      {/* <Flex align={'center'} justify={'end'}>
        <ColorModeToggle />
      </Flex> */}
      <Flex direction={'column'} align={'center'} justify={'center'} gap={5}>
        <Heading>Botões</Heading>
        <Flex gap={5}>
          <Flex direction={'column'} gap={5} align={'center'}>
            <Button variant={'origemBlueSolid'}>Solid</Button>
            <Button variant={'origemBlueOutline'}>Outline</Button>
            <Button variant={'origemBlueGhost'}>Ghost</Button>
            <IconButton aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditSolid" />
            <IconButton aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditOutline" />
          </Flex>
          <Flex direction={'column'} gap={5} align={'center'}>
            <Button variant={'origemRedSolid'}>Solid</Button>
            <Button variant={'origemRedOutline'}>Outline</Button>
            <Button variant={'origemRedGhost'}>Ghost</Button>
            <IconButton aria-label="Botão de Lixeira" icon={<FiTrash />} variant="origemDeleteSolid" />
            <IconButton aria-label="Botão de Lixeira" icon={<FiTrash />} variant="origemDeleteOutline" />
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
