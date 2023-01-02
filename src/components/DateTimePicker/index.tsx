import { forwardRef } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useDispatch } from 'react-redux';

import { Button, Flex, Text } from '@chakra-ui/react';
import ptBR from 'date-fns/locale/pt-BR';

import { RequiredField } from 'components/RequiredField/RequiredField';
registerLocale('pt-BR', ptBR);

interface Props {
  label: string; // Label do campo
  isRequired?: boolean; // Campo é obrigatório?
  showTimeSelect?: boolean; // Mostrar campo de hora?
  isDisabled?: boolean; // Campo está desabilitado?
  dateFormat: 'Pp' | 'dd/MM/yyyy'; // Formato da data
  dispatchAction: Function; // Action que será disparada ao selecionar uma opção
  selectedDate: Date; // Data selecionada
}

function DateTimePicker({
  label,
  isRequired,
  showTimeSelect,
  isDisabled,
  dateFormat,
  dispatchAction,
  selectedDate,
}: Props) {
  const dispatch = useDispatch();

  const Trigger = forwardRef(({ value, onClick }: any, ref: any) => (
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
    <Flex direction={'column'}>
      <Flex gap={1}>
        {isRequired ? <RequiredField /> : null}
        <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
          {label}
        </Text>
      </Flex>
      <ReactDatePicker
        customInput={<Trigger />}
        locale="pt-BR"
        disabled={isDisabled}
        selected={selectedDate}
        onChange={(date: any) => dispatch(dispatchAction(date))}
        showTimeSelect={showTimeSelect}
        dateFormat={dateFormat}
      />
    </Flex>
  );
}

export default DateTimePicker;
