import { FiTrash } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';

import {
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';

import DateTimePicker from 'components/DateTimePicker';
import GridLayout from 'components/Grid';
import { RequiredField } from 'components/RequiredField/RequiredField';
import SelectFiltragem from 'components/SelectFiltragem';

export function StyleGuide() {
  const options = [
    {
      value: 1,
      label: 'Opção 1',
    },
  ];

  return (
    <GridLayout>
      <Flex direction={'column'} align={'start'} justify={'center'} gap={5}>
        <Heading>Botões</Heading>
        <Flex gap={5}>
          <Flex direction={'column'} gap={5} align={'center'}>
            <Button variant={'origemBlueSolid'}>Solid</Button>
            <Button variant={'origemBlueOutline'}>Outline</Button>
            <Button variant={'origemBlueGhost'}>Ghost</Button>
            <IconButton aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditSolid" />
            <IconButton aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditOutline" />
            <IconButton aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditGhost" />
          </Flex>
          <Flex direction={'column'} gap={5} align={'center'}>
            <Button variant={'origemRedSolid'}>Solid</Button>
            <Button variant={'origemRedOutline'}>Outline</Button>
            <Button variant={'origemRedGhost'}>Ghost</Button>
            <IconButton aria-label="Botão de Lixeira" icon={<FiTrash />} variant="origemDeleteSolid" />
            <IconButton aria-label="Botão de Lixeira" icon={<FiTrash />} variant="origemDeleteOutline" />
            <IconButton aria-label="Botão de Lixeira" icon={<FiTrash />} variant="origemDeleteGhost" />
          </Flex>
        </Flex>
      </Flex>
      <Flex direction={'column'} align={'start'} justify={'center'} gap={5}>
        <Heading>Input</Heading>
        <Flex gap={4}>
          <FormControl>
            <Flex gap={1}>
              <RequiredField />
              <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                INPUT DE TEXTO
              </Text>
            </Flex>
            <Input variant={'origem'} placeholder={'Origem'} />
          </FormControl>
          <FormControl>
            <Flex gap={1}>
              <RequiredField />
              <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                INPUT NUMÉRICO
              </Text>
            </Flex>
            <NumberInput min={0} max={100} variant={'origem'}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <SelectFiltragem
            options={options}
            propName={'select'}
            selectLabel={'SELECT:'}
            value={options[0]}
            dispatchAction={() => {}}
          />
          <DateTimePicker
            label={'DATETIME PICKER'}
            showTimeSelect={true}
            dateFormat={'Pp'}
            dispatchAction={() => {}}
            selectedDate={new Date()}
          />
          <DateTimePicker
            label={'DATE PICKER'}
            isRequired={true}
            dateFormat={'dd/MM/yyyy'}
            dispatchAction={() => {}}
            selectedDate={new Date()}
          />
        </Flex>
      </Flex>
    </GridLayout>
  );
}
