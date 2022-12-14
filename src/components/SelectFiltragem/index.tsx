import Select from 'react-select';

import { Flex, FormControl, Text } from '@chakra-ui/react';

import { RequiredField } from 'components/RequiredField/RequiredField';

interface Value {
  value: string | number;
  label: string;
}

interface Props {
  selectLabel?: string;
  propName: string;
  options: any;
  value: Value;
  required?: boolean;
  isDisabled?: boolean;
}

function SelectFiltragem({ selectLabel, propName, options, value, required, isDisabled }: Props) {
  const defaultValue = {
    value: 0,
    label: '',
  };

  const handleChange = (event: any, name: any) => {
    // console.log(event);
  };

  const customStyles = {
    placeholder: (defaultStyles: any) => ({
      ...defaultStyles,
      color: 'black',
      fontWeigth: '400',
      fontSize: '14px',
    }),
    control: (base: any) => ({
      ...base,
      backgroundColor: 'white',
      height: 56,
      minHeight: 56,
      border: '0.5px solid #E2E8F0',
      borderRadius: '8px',
      fontWeigth: '400',
      fontSize: '14px',

      '&:disabled': {
        backgroundColor: '#FFFFFF',
      },
    }),

    dropdownIndicator: (base: any) => ({
      ...base,
      color: '#2D2926',
    }),

    menu: (base: any) => ({
      ...base,
      zIndex: 9999,
      minWidth: '300px',
    }),
  };

  return (
    <>
      <FormControl>
        {selectLabel && (
          <Flex gap={1}>
            {required && <RequiredField />}
            <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
              {selectLabel}
            </Text>
          </Flex>
        )}
        <Select
          styles={customStyles}
          components={{
            IndicatorSeparator: () => null,
          }}
          isSearchable
          id={propName}
          name={propName}
          placeholder={'Selecione'}
          onChange={(event, name) => handleChange(event, name)}
          options={options}
          defaultValue={'Selecione'}
          value={JSON.stringify(value) === JSON.stringify(defaultValue) ? 'Selecione' : value}
          isDisabled={isDisabled}
        />
      </FormControl>
    </>
  );
}

export default SelectFiltragem;
