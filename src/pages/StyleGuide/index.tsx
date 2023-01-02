import { forwardRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
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

import GridLayout from 'components/Grid';
import { RequiredField } from 'components/RequiredField/RequiredField';
import SelectFiltragem from 'components/SelectFiltragem';

export function StyleGuide() {
  const [date, setDate] = useState<any>('');

  const options = [
    {
      value: 1,
      label: 'Opção 1',
    },
  ];

  const TriggerDatePickerInicio = forwardRef(({ value, onClick }: any, ref: any) => (
    <Button
      h={'56px'}
      w={'100%'}
      onClick={onClick}
      ref={ref}
      variant="outline"
      px={5}
      minW={'220px'}
      borderRadius={'8px'}
      color={value === '' ? '#575757' : '#000'}
      _focus={{
        bg: 'white',
        borderColor: 'origem.300',
        borderWidth: '2px',
      }}
      _hover={{
        bg: 'white',
        borderColor: 'hsl(0, 0%, 70%)',
        borderWidth: '1px',
      }}
    >
      {value === '' ? 'Selecione uma data' : value}
    </Button>
  ));

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
          <Flex direction={'column'}>
            <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
              DATE PICKER
            </Text>
            <ReactDatePicker
              selected={date}
              onChange={(date: any) => setDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={<TriggerDatePickerInicio />}
            />
          </Flex>
        </Flex>
      </Flex>
    </GridLayout>
  );
}
