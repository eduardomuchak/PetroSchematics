import { forwardRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Button, useBreakpointValue } from '@chakra-ui/react';

function DatePicker() {
  const [dataInicio, setDataInicio] = useState<any>('');

  const TriggerDatePickerInicio = forwardRef(({ value, onClick }: any, ref: any) => (
    <Button
      h={'56px'}
      w={'100%'}
      onClick={onClick}
      ref={ref}
      variant="outline"
      px={useBreakpointValue({ base: 5, sm: 5, md: 5 })}
      minW={useBreakpointValue({ base: '220px', sm: '220px', md: '220px' })}
      borderRadius={'8px'}
    >
      {value === '' ? 'Selecione uma data' : value}
    </Button>
  ));

  return (
    <ReactDatePicker
      selected={dataInicio}
      onChange={(date) => setDataInicio(date)}
      locale="pt-BR"
      dateFormat="dd/MM/yyyy"
      customInput={<TriggerDatePickerInicio />}
    />
  );
}

export default DatePicker;
