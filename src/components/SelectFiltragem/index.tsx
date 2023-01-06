import { useDispatch } from 'react-redux';
import Select from 'react-select';

import { Flex, FormControl, Text } from '@chakra-ui/react';

import { RequiredField } from 'components/RequiredField/RequiredField';

interface Value {
  value: string | number;
  label: string;
}

interface Props {
  selectLabel?: string; // Label do select
  propName: string; // Nome da propriedade que será passada para o reducer
  options: any; // Array de opções do select (ex: [{ value: '1', label: 'Opção 1' }])
  value: Value; // Valor selecionado no select
  required?: boolean; // Se o campo é obrigatório
  isDisabled?: boolean; // Se o campo está desabilitado
  dispatchAction: Function; // Action que será disparada ao selecionar uma opção
  width?: string; // Largura do select
}

function SelectFiltragem({
  selectLabel,
  propName,
  options,
  value,
  required,
  isDisabled,
  dispatchAction,
  width,
}: Props) {
  const dispatch = useDispatch();
  const defaultStringsValue = {
    value: '',
    label: '',
  };

  const defaultNumberValue = {
    value: 0,
    label: '',
  };

  const handleChange = (event: any) => {
    dispatch(dispatchAction(event));
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
      _focus: {
        borderColor: '#1557fd',
        borderWidth: '2px',
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
    <Flex w={width || '100%'}>
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
          onChange={(event) => handleChange(event)}
          options={options}
          defaultValue={'Selecione'}
          value={
            JSON.stringify(value) === JSON.stringify(defaultStringsValue) ||
            JSON.stringify(value) === JSON.stringify(defaultNumberValue)
              ? 'Selecione'
              : value
          }
          isDisabled={isDisabled}
        />
      </FormControl>
    </Flex>
  );
}

export default SelectFiltragem;
