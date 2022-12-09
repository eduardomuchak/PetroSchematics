import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import { Flex, IconButton, Td, Text, Tr } from '@chakra-ui/react';
import { setSurfaceEquipment } from 'features/schematicWell/schematicWellSlice';

import TabelaGenerica from 'components/TabelaGenerica';

import ModalEditarEquipSuperficie from './ModalEditarEquipSuperficie';

function TabelaEquipamentoSuperficie() {
  const dispacth = useDispatch();
  // Estados para paginação
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(5);
  const fromTo = {
    from,
    to,
    setFrom,
    setTo,
  };
  //

  // Dados da tabela
  const [filteredTable, setFilteredTable] = useState<any[]>([
    {
      surfaceEquipment: '',
      description: '',
    },
  ]);
  const header = ['EQUIPAMENTOS DE SUPERFÍCIE', 'DESCRIÇÃO', 'AÇÕES'];
  const footer = ['PACKER FLUID - 9.8 lb/gal'];
  //

  const mock = [
    {
      surfaceEquipment: 'Árvore de Natal',
      description: 'Descrição da árvore',
    },
    {
      surfaceEquipment: 'Adaptador da Cabeça de Produção',
      description: 'Descrição do adaptador',
    },
    {
      surfaceEquipment: 'Suspensor da Cabeca de Produção',
      description: 'Descrição do suspensor',
    },
    {
      surfaceEquipment: 'Cabeça de Produção',
      description: 'Descrição da cabeça de produção',
    },
    {
      surfaceEquipment: 'Cabeça de Revestimento',
      description: 'Descrição da cabeça de revestimento',
    },
  ];

  useEffect(() => {
    dispacth(setSurfaceEquipment(mock));
    setFilteredTable(mock);
  }, []);

  // Criar um componente com o corpo da tabela e chamar ele como children do TabelaGenerica
  function Body() {
    return (
      <>
        {filteredTable.length ? (
          filteredTable.slice(from, to).map((tableLine: any, index: number) => (
            <Tr key={index}>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Text>{tableLine.surfaceEquipment}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{tableLine.description}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Flex gap={2} align={'center'} justify={'center'}>
                  <ModalEditarEquipSuperficie equipment={tableLine} />
                  <IconButton aria-label="Botão de Lixeira" icon={<FiTrash />} variant="origemDeleteOutline" />
                </Flex>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={header.length} textAlign={'start'}>
              <Text textAlign={'start'} fontWeight={'semibold'}>
                Não há dados
              </Text>
            </Td>
          </Tr>
        )}
      </>
    );
  }

  return (
    <Flex w={'100%'} direction={'column'} gap={2} overflowX={'scroll'}>
      <TabelaGenerica data={filteredTable} header={header} fromTo={fromTo} footer={footer} pagination>
        <Body />
      </TabelaGenerica>
    </Flex>
  );
}

export default TabelaEquipamentoSuperficie;
