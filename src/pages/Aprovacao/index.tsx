/* eslint-disable no-nested-ternary */
import { useState, useEffect, useRef } from 'react';
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
import { getAllPocos, getAllDocs, aproveForm } from 'features/aprovacao';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';

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

function containsObject2(obj: any, list: any) {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i].id_document === obj?.id_document) {
      return true;
    }
  }

  return false;
}

function compare(a: any, b: any) {
  if (new Date(a.dat_log) < new Date(b.dat_log)) {
    return -1;
  }
  if (new Date(a.dat_log) > new Date(b.dat_log)) {
    return 1;
  }
  return 0;
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
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
  const [filterStatus, setFilterStatus] = useState<any>({ value: 0, label: 'Todos' });
  const [dateIni, setDateIni] = useState<any>('');
  const [dateEnd, setDateEnd] = useState<any>('');
  const [paginationBottom, setPaginationBottom] = useState<number>(0);
  const [paginationShow, setPaginationShow] = useState<number>(10);
  const [eyePopOverInfo, setEyePopOverInfo] = useState<any>({ form_data: {} });
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [refilter, setRefilter] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  useInterval(() => {
    getFormsAgain();
  }, 10000);

  const options: Operacao[] = [
    { value: 1, label: 'Acompanhamento XV', form: 'form-xv' },
    { value: 2, label: 'Controle de Lançamento de Bastões', form: 'form-control-bastoes' },
    { value: 3, label: 'Teste de Poços', form: 'form-teste-pocos' },
    { value: 4, label: 'Registro de Pressão da Coluna e Anulares', form: 'form-reg-coluna' },
    { value: 5, label: 'Lançamento Raspadores', form: 'form-lanc-rasp' },
    { value: 6, label: 'Coleta de Amostras', form: 'form-coleta-amostras' },
    { value: 7, label: 'Teste DHSV', form: 'form-teste-dhsv' },
    { value: 8, label: 'Controle Fechamento e Abertura de Poços', form: 'form-control-abert' },
    { value: 9, label: 'Purgas Poços', form: 'form-purgas-pocos' },
  ];

  const campos: any[] = [
    { value: 1, label: 'Campo de Pilar' },
    { value: 2, label: 'Campo de Furado' },
  ];

  const status: any[] = [
    { value: 0, label: 'Todos' },
    { value: 1, label: 'Pendentes' },
    { value: 2, label: 'Aprovados' },
    { value: 3, label: 'Reprovados' },
  ];

  const getAll = async () => {
    const pocos = await getAllPocos();
    const pocosLocal =
      pocos.documents.map((val: any) => ({
        ...val,
        value: val._id,
        label: val.nome_poco,
      })) || [];
    setListaFiltroPoco(pocosLocal);
    setListaPocoOriginais(pocosLocal);
    setListaFiltroForm(options);
    let all: any[] = [];
    for await (const results of options) {
      const local = await getAllDocs(results.form);
      const prev = all;
      all = prev.concat(local.documents);
    }
    setFormsList(all.sort(compare));
    setRenderList(all.sort(compare));
    setloading(false);
  };

  const handleCheckbox = (value: any, index: number) => {
    const newList = renderList;
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
      const filtrarCampo = listBase.filter((val: any) =>
        filterCampo.label == '' ? val : containsObject(val.form_data?.poco, filtered),
      );
      const filtrarPoco = filtrarCampo.filter((val: any) =>
        filterPoco.label == '' ? val : val.form_data.poco?.nome_poco?.includes(filterPoco.label),
      );
      const filtrarForm = filtrarPoco.filter((val: any) =>
        filterForm.label == '' ? val : val.form_type?.includes(filterForm.form),
      );
      const filtrarDateIni = filtrarForm.filter((val: any) => (dateIni == '' ? val : new Date(val.dat_log) > dateIni));
      const filtrarDateEnd = filtrarDateIni.filter((val: any) =>
        dateEnd == '' ? val : new Date(val.dat_log) <= dateEnd,
      );
      const filtrarStatus = filtrarDateEnd.filter((val: any) =>
        filterStatus.value == 0 ? val : val.ind_situacao == filterStatus.value,
      );
      setRenderList(filtrarStatus);
      if (Number(filtrarStatus.length) < paginationBottom) {
        setPaginationBottom(0);
      }
    }
  }, [filterCampo, filterForm, filterPoco, dateIni, dateEnd, filterStatus, refilter]);

  const clearFilters = () => {
    setFilterCampo({ value: 0, label: '' });
    setFilterForm({ value: 0, label: '' });
    setFilterPoco({ value: 0, label: '' });
    setFilterStatus({ value: 0, label: 'Todos' });
    setDateIni('');
    setDateEnd('');
  };

  const transfer = (list: any, index: number) => {
    navigate(`/formulario`, {
      state: {
        list,
        index,
      },
    });
  };

  const handleCheckButton = async (aproved: boolean) => {
    setloading(true);
    const updateList = renderList.filter((val: any) => val.checked === true);
    if (aproved) {
      for await (const results of updateList) {
        await aproveForm(results.form_type, results.id_document, 2);
      }
    } else {
      for await (const results of updateList) {
        await aproveForm(results.form_type, results.id_document, 3);
      }
    }
    getFormsAgain();
  };

  const getFormsAgain = async () => {
    let all: any[] = [];
    for await (const results of options) {
      const local = await getAllDocs(results.form);
      const prev = all;
      all = prev.concat(local.documents);
    }
    const sorted = all.sort(compare);
    const oldChecked = renderList.filter((val: any) => val.checked === true);
    const newList = [];
    for (const item of sorted) {
      if (oldChecked.length > 0) {
        if (containsObject2(item, oldChecked)) {
          const newItem = {
            checked: true,
            ...item,
          };
          newList.push(newItem);
        } else {
          newList.push(item);
        }
      } else {
        newList.push(item);
      }
    }
    setFormsList(newList);
    setRefilter(!refilter);
    setloading(false);
  };

  return (
    <GridLayout title={'MÓDULO DE APROVAÇÕES'}>
      <Popover isOpen={open} onClose={() => setOpen(false)} placement="left-start">
        <Flex direction={'column'} flex={1}>
          <Flex gap={2} mb={8} flexWrap="wrap">
            <Flex minW={200} maxW={200} direction={'column'}>
              <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#A7A7A7'} w={'100%'}>
                STATUS
              </Text>
              <Select
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder={'Selecione'}
                options={status}
                onChange={(e) => setFilterStatus(e)}
                defaultValue={'Selecione'}
                value={filterStatus}
                isSearchable
              />
            </Flex>
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
                onChange={(e) => [setFilterCampo(e), setFilterPoco({ value: 0, label: '' })]}
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
          {loading ? (
            <Loading />
          ) : (
            <>
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
                        <CheckButton
                          disabled={renderList.filter((val: any) => val.checked === true).length == 0}
                          handle={handleCheckButton}
                        />
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
                        <Flex justify={'center'}>Formulário</Flex>
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
                                {`${new Date(item.dat_log).getDate() < 10 ? '0' : ''}${new Date(
                                  item.dat_log,
                                ).getDate()}/${new Date(item.dat_log).getMonth() + 1 < 10 ? '0' : ''}${
                                  new Date(item.dat_log).getMonth() + 1
                                }/${new Date(item.dat_log).getFullYear()}`}
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
                                {`${new Date(item.dat_log).getHours() < 10 ? '0' : ''}${new Date(
                                  item.dat_log,
                                ).getHours()}:${new Date(item.dat_log).getMinutes() < 10 ? '0' : ''}${new Date(
                                  item.dat_log,
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
                              <Flex justify={'center'}>
                                {options.filter((val: any) => val.form == item.form_type)[0]?.label || item.form_type}
                              </Flex>
                            </Td>
                            <Td
                              height={'56px'}
                              width={'16%'}
                              borderBottomWidth={'1px'}
                              borderTopWidth={'1px'}
                              borderColor={'#9FA2B4'}
                            >
                              <Flex justify={'center'}>{item.usu_log}</Flex>
                            </Td>
                            <Td
                              height={'56px'}
                              width={'16%'}
                              borderBottomWidth={'1px'}
                              borderTopWidth={'1px'}
                              borderColor={'#9FA2B4'}
                            >
                              <Flex justify={'center'}>
                                {item.ind_situacao == 2
                                  ? 'Aprovado'
                                  : item.ind_situacao == 3
                                  ? 'Reprovado'
                                  : 'Pendente'}
                              </Flex>
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
                                onClick={() => transfer(renderList, index)}
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
                      <Th></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </>
          )}
        </Flex>
        <PopoverContent w={'fit-content'}>
          <PopoverBody w={'fit-content'}>
            <EyePopover infos={eyePopOverInfo} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </GridLayout>
  );
}
