import { forwardRef, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

import { Button, Flex, Text } from '@chakra-ui/react';
// import { getDay } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { RequiredField } from 'components/RequiredField/RequiredField';
registerLocale('pt-BR', ptBR);

interface Props {
  label: string;
  isRequired?: boolean;
  showTimeSelect?: boolean;
  isDisabled?: boolean;
  dateFormat: 'Pp' | 'dd/MM/yyyy';
}

function DateTimePicker({ label, isRequired, showTimeSelect, isDisabled, dateFormat }: Props) {
  const [date, setDate] = useState<Date | null>(null);

  // const isWeekday = (date: Date) => {
  //   const day = getDay(date);
  //   return day !== 0 && day !== 6;
  // };

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

  // if (date) {
  //   console.log('date', date.toString());
  // }

  return (
    <Flex direction={'column'}>
      <Flex gap={1}>
        {isRequired ? <RequiredField /> : null}
        <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
          {label}
        </Text>
      </Flex>
      <ReactDatePicker
        // filterDate={isWeekday}
        disabled={isDisabled}
        showTimeSelect={showTimeSelect}
        locale="pt-BR"
        selected={date}
        onChange={(date: any) => setDate(date)}
        dateFormat={dateFormat}
        customInput={<Trigger />}
      />
    </Flex>
  );
}

export default DateTimePicker;
