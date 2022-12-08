import { useState, useEffect } from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import Select from 'react-select';

import {
  Flex,
  Text,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  Td,
  TableCaption,
  Checkbox,
  Button,
} from '@chakra-ui/react';

import ContainerPagina from 'components/ContainerPagina';
import Sidebar from 'components/SideBar';
import TituloPagina from 'components/TituloPagina';

import DatePicker from './DatePicker';

// import { getAllPocos } from 'api/mongoDB';

import { listaBastoes, listaReg, listaTeste, listaXV, pocos, tanques } from './mockFile';

type Operacao = {
  value: number;
  label: string;
};

export function Aprovacaopage() {
  const [render, setRender] = useState<boolean>(false);
  const [formsList, setFormsList] = useState<any[]>([]);
  const [listaFiltroCampo, setListaFiltroCampo] = useState<any[]>([]);
  const [listaFiltroForm, setListaFiltroForm] = useState<any[]>([]);
  const [listaFiltroPoco, setListaFiltroPoco] = useState<any[]>([]);
  const [filterCampo, setFilterCampo] = useState<any>({ value: 0, label: '' });
  const [filterForm, setFilterForm] = useState<any>({ value: 0, label: '' });
  const [filterPoco, setFilterPoco] = useState<any>({ value: 0, label: '' });

  useEffect(() => {
    getAll();
  }, []);

  const options: Operacao[] = [
    { value: 1, label: 'Acompanhamento XV' },
    { value: 2, label: 'Controle de Lançamento de Bastões' },
    { value: 3, label: 'Teste de Poços' },
    { value: 4, label: 'Registro de Pressão da Coluna e Anulares' },
  ];

  const getAll = async () => {
    // const pocosLocal = await getAllPocos();
    // console.log('pocosLocal', pocosLocal);
    const tanquesLocal = tanques.map((val: any) => {
      const inside = {
        value: val.id_tanque,
        label: val.nom_tanque,
      };
      return inside;
    });
    const pocosLocal = pocos.map((val: any) => ({
      value: val.id_poco,
      label: val.nome_poco,
    }));
    const all = listaXV.concat(listaTeste.concat(listaBastoes.concat(listaReg)));
    setFormsList(all);
    setListaFiltroCampo(tanquesLocal);
    setListaFiltroPoco(pocosLocal);
    setListaFiltroForm(options);
  };

  const handleCheckbox = (value: any, index: number) => {
    const newList = formsList;
    newList[index].checked = value;
    setFormsList(newList);
    setRender(!render);
  };

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

  return (
    <Sidebar>
      <ContainerPagina>
        <TituloPagina botaoVoltar>TABELA DE APROVACÕES</TituloPagina>
        <Flex direction={'column'} flex={1}>
          <Flex gap={2} mb={8} flexWrap="wrap">
            <Flex minW={200} maxW={200} direction={'column'}>
              <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
                OPERAÇÃO DE POÇOS
              </Text>
              <Select
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder={'Selecione'}
                options={listaFiltroCampo}
                onChange={(e) => setFilterCampo(e)}
                defaultValue={'Selecione'}
                value={filterCampo.value === 0 ? 'Selecione' : filterCampo}
                isSearchable
              />
            </Flex>
            <Flex minW={200} maxW={200} direction={'column'}>
              <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
                POÇO
              </Text>
              <Select
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder={'Selecione'}
                options={listaFiltroPoco}
                onChange={(e) => setFilterForm(e)}
                defaultValue={'Selecione'}
                value={filterPoco.value === 0 ? 'Selecione' : filterPoco}
                isSearchable
              />
            </Flex>
            <Flex minW={200} maxW={200} direction={'column'}>
              <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
                FORMULÁRIO
              </Text>
              <Select
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder={'Selecione'}
                options={listaFiltroForm}
                onChange={(e) => setFilterPoco(e)}
                defaultValue={'Selecione'}
                value={filterForm.value === 0 ? 'Selecione' : filterForm}
                isSearchable
              />
            </Flex>
            <Flex direction={'column'}>
              <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
                INTERVALO INICIAL
              </Text>
              <DatePicker />
            </Flex>
            <Flex direction={'column'}>
              <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
                INTERVALO FINAL
              </Text>
              <DatePicker />
            </Flex>
          </Flex>
          <Flex pl={2} pr={2} mb={4} justify={'space-between'} align={'center'}>
            <Text fontSize={'16px'} fontWeight={'700'}>
              Dados pra validação
            </Text>
            <Button
              disabled={formsList.filter((val: any) => val.checked === true).length == 0}
              h={'42px'}
              w={'177px'}
              variant="outline"
              color={'origem.500'}
              colorScheme="blue"
              onClick={() => []}
              _hover={{
                shadow: '0px 0px 5px -1px rgba(0,72,187,1)',
                transition: 'all 0.4s',
              }}
              fontSize={'18px'}
              fontWeight={'700'}
              borderRadius={'96px'}
            >
              <Text fontSize={'14px'} fontWeight={'700'}>
                Aprovar selecionados
              </Text>
            </Button>
          </Flex>
          <TableContainer>
            <Table>
              <TableCaption>Tabela de Fórmularos para aprovar</TableCaption>
              <Thead>
                <Tr height={'40px'}>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                  >
                    <Flex justify={'center'}>Aprovar</Flex>
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                  >
                    <Flex justify={'center'}>Hora</Flex>
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                  >
                    <Flex justify={'center'}>Operador</Flex>
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                  >
                    <Flex justify={'center'}>Data</Flex>
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                  >
                    <Flex justify={'center'}>Status</Flex>
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                  >
                    <Flex justify={'center'}>Ações</Flex>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {formsList.map((item: any, index: number) => (
                  <Tr
                    key={index}
                    height={'56px'}
                    // eslint-disable-next-line no-nested-ternary
                    background={item.checked ? '#D9EAFD' : index % 2 == 0 ? '#FEFEFE' : '#F9F9F9'}
                  >
                    <Td
                      height={'56px'}
                      width={'16%'}
                      borderBottomWidth={'1px'}
                      borderTopWidth={'1px'}
                      borderColor={'#9FA2B4'}
                    >
                      <Flex justify={'center'}>
                        <Checkbox value={item.checked} onChange={(e) => handleCheckbox(e.target.checked, index)} />
                      </Flex>
                    </Td>
                    <Td
                      height={'56px'}
                      width={'16%'}
                      borderBottomWidth={'1px'}
                      borderTopWidth={'1px'}
                      borderColor={'#9FA2B4'}
                    >
                      <Flex justify={'center'}>
                        {`${new Date(item.dat_usu_aprov).getHours() < 10 ? '0' : ''}${new Date(
                          item.dat_usu_aprov,
                        ).getHours()}:${new Date(item.dat_usu_aprov).getMinutes() < 10 ? '0' : ''}${new Date(
                          item.dat_usu_aprov,
                        ).getMinutes()}`}
                      </Flex>
                    </Td>
                    <Td
                      height={'56px'}
                      width={'16%'}
                      borderBottomWidth={'1px'}
                      borderTopWidth={'1px'}
                      borderColor={'#9FA2B4'}
                    >
                      <Flex justify={'center'}>{item.nom_usu_aprov}</Flex>
                    </Td>
                    <Td
                      height={'56px'}
                      width={'16%'}
                      borderBottomWidth={'1px'}
                      borderTopWidth={'1px'}
                      borderColor={'#9FA2B4'}
                    >
                      <Flex justify={'center'}>
                        {`${new Date(item.dat_usu_aprov).getDate() < 10 ? '0' : ''}${new Date(
                          item.dat_usu_aprov,
                        ).getDate()}/${new Date(item.dat_usu_aprov).getMonth() + 1 < 10 ? '0' : ''}${
                          new Date(item.dat_usu_aprov).getMonth() + 1
                        }/${new Date(item.dat_usu_aprov).getFullYear()}`}
                      </Flex>
                    </Td>
                    <Td
                      height={'56px'}
                      width={'16%'}
                      borderBottomWidth={'1px'}
                      borderTopWidth={'1px'}
                      borderColor={'#9FA2B4'}
                    >
                      <Flex justify={'center'}>Aprovado</Flex>
                    </Td>
                    <Td
                      height={'56px'}
                      width={'16%'}
                      borderBottomWidth={'1px'}
                      borderTopWidth={'1px'}
                      borderColor={'#9FA2B4'}
                    >
                      <Flex justify={'center'}>
                        <BsFillEyeFill />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  {/* <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th> */}
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Flex>
      </ContainerPagina>
    </Sidebar>
  );
}
