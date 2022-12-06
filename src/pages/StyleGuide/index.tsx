import { FiTrash } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';

import { Button, Flex, Heading, IconButton, Input } from '@chakra-ui/react';

import ContainerPagina from 'components/ContainerPagina';
import Sidebar from 'components/SideBar';

export function StyleGuide() {
  return (
    <Sidebar>
      <ContainerPagina>
        <Flex direction={'column'} align={'start'} justify={'center'} gap={5}>
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
        <Flex direction={'column'} align={'start'} justify={'center'} gap={5}>
          <Heading>Input</Heading>
          <Flex>
            <Input variant={'origem'} placeholder={'Origem'} />
          </Flex>
        </Flex>
      </ContainerPagina>
    </Sidebar>
  );
}
