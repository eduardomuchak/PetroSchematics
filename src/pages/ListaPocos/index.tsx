import { useState } from 'react';
import Select from 'react-select';

import { Flex, Box, Text } from '@chakra-ui/react';

import ContainerPagina from 'components/ContainerPagina';
import Sidebar from 'components/SideBar';
import TituloPagina from 'components/TituloPagina';

type Operacao = {
  value: number;
  label: string;
};

export function ListaPocospage() {
  const [operacao, setOperacao] = useState<any>({ value: 0, label: '' });
  const customStyles = {
    placeholder: (defaultStyles: any) => ({
      ...defaultStyles,
      color: '#949494',
    }),
    control: (base: any) => ({
      ...base,
      height: 56,
      minHeight: 56,
      border: '0.5px solid #E2E8F0',
      borderRadius: '8px',
      fontWeigth: '400',
      fontSize: '14px',
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

  const options: Operacao[] = [
    { value: 1, label: 'foo' },
    { value: 2, label: 'bar' },
    { value: 3, label: 'loo' },
  ];

  return (
    <Sidebar>
      <ContainerPagina>
        <TituloPagina botaoVoltar>Lista de Aprovações</TituloPagina>
        <Flex align={'center'} justify={'center'} flex={1}>
          <Box w={350}>
            <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
              OPERAÇÃO DE POÇOS
            </Text>
            <Select
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder={'Selecione'}
              options={options}
              onChange={(e) => setOperacao(e)}
              defaultValue={'Selecione'}
              value={operacao.value === 0 ? 'Selecione' : operacao}
              isSearchable
            />
            <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
              POÇO
            </Text>
            <Select
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder={'Selecione'}
              options={options}
              onChange={(e) => setOperacao(e)}
              defaultValue={'Selecione'}
              value={operacao.value === 0 ? 'Selecione' : operacao}
              isSearchable
            />
          </Box>
        </Flex>
      </ContainerPagina>
    </Sidebar>
  );
}
