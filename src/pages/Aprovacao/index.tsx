import { useState, useEffect } from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import Select from 'react-select';

import {
  Flex,
  Text,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  TableCaption,
  Checkbox,
  Button,
  Tfoot,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverAnchor,
} from '@chakra-ui/react';
import { getAllPocos, getAllDocs } from 'features/aprovacao';

import Header from 'components/Header';
import TituloPagina from 'components/TituloPagina';

import CheckButton from './CheckButton';
import DatePicker from './DatePicker';
import EyePopover from './EyePopover';
import PaginacaoTabela from './PaginacaoTabela';

type Operacao = {
  value: number;
  label: string;
  form: string;
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

function containsObject(obj: any, list: any) {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i].nome_poco === obj?.nome_poco) {
      return true;
    }
  }

  return false;
}

export function Aprovacaopage() {
  const [render, setRender] = useState<boolean>(false);
  const [renderList, setRenderList] = useState<any[]>([]);
  const [formsList, setFormsList] = useState<any[]>([]);
  const [listaFiltroForm, setListaFiltroForm] = useState<any[]>([]);
  const [listaPocoOriginais, setListaPocoOriginais] = useState<any[]>([]);
  const [listaFiltroPoco, setListaFiltroPoco] = useState<any[]>([]);
  const [filterCampo, setFilterCampo] = useState<any>({ value: 0, label: '' });
  const [filterForm, setFilterForm] = useState<any>({ value: 0, label: '' });
  const [filterPoco, setFilterPoco] = useState<any>({ value: 0, label: '' });
  const [dateIni, setDateIni] = useState<any>('');
  const [dateEnd, setDateEnd] = useState<any>('');
  const [paginationBottom, setPaginationBottom] = useState<number>(0);
  const [paginationShow, setPaginationShow] = useState<number>(10);
  const [eyePopOverInfo, setEyePopOverInfo] = useState<any>({ form_data: {} });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  const options: Operacao[] = [
    { value: 1, label: 'Acompanhamento XV', form: 'form-xv' },
    { value: 2, label: 'Controle de Lançamento de Bastões', form: 'form-control-bastoes' },
    { value: 3, label: 'Teste de Poços', form: 'form-teste-pocos' },
    { value: 4, label: 'Registro de Pressão da Coluna e Anulares', form: 'form-reg-coluna' },
  ];

  const campos: any[] = [
    { value: 1, label: 'Campo de Pilar' },
    { value: 2, label: 'Campo de Furado' },
  ];

  const getAll = async () => {
    // const tqs = await getAllTanques();
    const pocos = await getAllPocos();
    console.log('pocos', pocos);
    const pocosLocal = pocos.documents.map((val: any) => ({
      ...val,
      value: val._id,
      label: val.nome_poco,
    }));
    setListaFiltroPoco(pocosLocal);
    setListaPocoOriginais(pocosLocal);
    setListaFiltroForm(options);
    let all: any[] = [];
    // options.forEach(async (val: any) => {
    //   const local = await getAllDocs(val.form);
    //   console.log('local', local);
    //   const prev = all;
    //   all = prev.concat(local);
    // });
    for await (const results of options) {
      const local = await getAllDocs(results.form);
      console.log('local', local);
      const prev = all;
      all = prev.concat(local.documents);
    }
    console.log('all', all);
    setFormsList(all);
    setRenderList(all);
  };

  const handleCheckbox = (value: any, index: number) => {
    const newList = formsList;
    newList[index].checked = value;
    setFormsList(newList);
    setRender(!render);
  };

  useEffect(() => {
    if (formsList.length > 0) {
      const listBase = formsList;
      const allPocos = listaPocoOriginais;
      const filtered = allPocos.filter((val: any) =>
        filterCampo.value == 0 ? true : val.id_poco == filterCampo.value,
      );
      setListaFiltroPoco(filtered);
      if (filterCampo.value != 0) {
        setFilterPoco({ value: 0, label: '' });
      }
      const filtrarCampo = listBase.filter((val: any) =>
        filterCampo.label == '' ? val : containsObject(val.form_data?.poco, filtered),
      );
      const filtrarPoco = filtrarCampo.filter((val: any) =>
        filterPoco.label == '' ? val : val.form_data.poco?.nome_poco?.includes(filterPoco.label),
      );
      const filtrarForm = filtrarPoco.filter((val: any) =>
        filterForm.label == '' ? val : val.form_type?.includes(filterForm.form),
      );
      const filtrarDateIni = filtrarForm.filter((val: any) =>
        dateIni == '' ? val : new Date(val.dat_usu_aprov) > dateIni,
      );

      const filtrarDateEnd = filtrarDateIni.filter((val: any) =>
        dateEnd == '' ? val : new Date(val.dat_usu_aprov) <= dateEnd,
      );
      setRenderList(filtrarDateEnd);
      setPaginationBottom(0);
    }
  }, [filterCampo, filterForm, filterPoco, dateIni, dateEnd]);

  const clearFilters = () => {
    setFilterCampo({ value: 0, label: '' });
    setFilterForm({ value: 0, label: '' });
    setFilterPoco({ value: 0, label: '' });
    setDateIni('');
    setDateEnd('');
  };

  const transfer = (item: any) => {
    navigate(`/formulario`, {
      state: {
        item,
      },
    });
  };

  return (
    <Header>
      <TituloPagina botaoVoltar>TABELA DE APROVACÕES</TituloPagina>
      <Popover isOpen={open} onClose={() => setOpen(false)} placement="left-start">
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
                options={campos}
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
                onChange={(e) => setFilterPoco(e)}
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
                onChange={(e) => setFilterForm(e)}
                defaultValue={'Selecione'}
                value={filterForm.value === 0 ? 'Selecione' : filterForm}
                isSearchable
              />
            </Flex>
            <Flex direction={'column'}>
              <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
                INTERVALO INICIAL
              </Text>
              <DatePicker value={dateIni} seter={setDateIni} />
            </Flex>
            <Flex direction={'column'}>
              <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
                INTERVALO FINAL
              </Text>
              <DatePicker value={dateEnd} seter={setDateEnd} />
            </Flex>
            <Flex align={'center'}>
              <Button
                h={'42px'}
                w={'177px'}
                variant="outline"
                color={'origem.500'}
                colorScheme="blue"
                onClick={() => clearFilters()}
                _hover={{
                  shadow: '0px 0px 5px -1px rgba(0,72,187,1)',
                  transition: 'all 0.4s',
                }}
                fontSize={'18px'}
                fontWeight={'700'}
                borderRadius={'96px'}
              >
                <Text fontSize={'14px'} fontWeight={'700'}>
                  Limpar Filtros
                </Text>
              </Button>
            </Flex>
          </Flex>

          <TableContainer borderRadius={'8px'}>
            <Table>
              <TableCaption>
                <PaginacaoTabela
                  paginationBottom={paginationBottom}
                  setPaginationBottom={setPaginationBottom}
                  paginationShow={paginationShow}
                  setPaginationShow={setPaginationShow}
                  max={renderList.length}
                />
              </TableCaption>
              <Thead>
                <Tr height={'40px'} background={'#0048BB'}>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                  >
                    <CheckButton />
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                    color={'#fff'}
                    fontWeight={'800'}
                  >
                    <Flex justify={'center'}>Hora</Flex>
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                    color={'#fff'}
                    fontWeight={'800'}
                  >
                    <Flex justify={'center'}>Operador</Flex>
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                    color={'#fff'}
                    fontWeight={'800'}
                  >
                    <Flex justify={'center'}>Data</Flex>
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                    color={'#fff'}
                    fontWeight={'800'}
                  >
                    <Flex justify={'center'}>Status</Flex>
                  </Th>
                  <Th
                    height={'40px'}
                    width={'16%'}
                    borderBottomWidth={'1px'}
                    borderTopWidth={'1px'}
                    borderColor={'#9FA2B4'}
                    color={'#fff'}
                    fontWeight={'800'}
                  >
                    <PopoverAnchor>
                      <Flex justify={'center'}>Ações</Flex>
                    </PopoverAnchor>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {renderList.map((item: any, index: number) => (
                  <>
                    {index >= paginationBottom && index < paginationBottom + paginationShow ? (
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
                            <Checkbox
                              size="lg"
                              value={item.checked}
                              onChange={(e) => handleCheckbox(e.target.checked, index)}
                            />
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
                          <Flex
                            cursor={'pointer'}
                            justify={'center'}
                            onMouseEnter={() => [setEyePopOverInfo(item), setOpen(true)]}
                            onMouseLeave={() => [setOpen(false)]}
                            onClick={() => transfer(item)}
                          >
                            <BsFillEyeFill />
                          </Flex>
                        </Td>
                      </Tr>
                    ) : undefined}
                  </>
                ))}
              </Tbody>
              <Tfoot>
                <Tr height={'17px'} background={'#0048BB'}>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Flex>
        <PopoverContent w={'fit-content'}>
          <PopoverBody w={'fit-content'}>
            <EyePopover infos={eyePopOverInfo} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Header>
  );
}
