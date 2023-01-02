import { forwardRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { Button, Flex, FormControl, Text } from '@chakra-ui/react';

import { RequiredField } from 'components/RequiredField/RequiredField';

interface Props {
  label: string;
  isRequired?: boolean;
}

function DateTimePicker({ label, isRequired }: Props) {
  const [date, setDate] = useState<any>('');

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
    <FormControl>
      <Flex gap={1}>
        {isRequired ? <RequiredField /> : null}
        <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
          {label}
        </Text>
      </Flex>
      <ReactDatePicker
        selected={date}
        onChange={(date: any) => setDate(date)}
        dateFormat="dd/MM/yyyy"
        customInput={<Trigger />}
      />
    </FormControl>
  );
}

export default DateTimePicker;
