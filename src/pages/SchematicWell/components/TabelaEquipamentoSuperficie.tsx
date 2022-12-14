import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Flex, Td, Text, Tr } from '@chakra-ui/react';
import { SurfaceEquipment } from 'features/schematicWell/interfaces';
import { schematicWellState, setSurfaceEquipment } from 'features/schematicWell/schematicWellSlice';
import { useDeleteSurfaceEquipmentMutation } from 'features/schematicWell/service/schematicWellApi';

import TabelaGenerica from 'components/TabelaGenerica';

import { usePayload } from 'hooks/usePayload';

import ModalDeletar from './ModalDeletar';
import ModalEditarEquipSuperficie from './ModalEditarEquipSuperficie';

function TabelaEquipamentoSuperficie() {
  const dispacth = useDispatch();
  const { surfaceEquipmentTable } = useSelector(schematicWellState);
  const [deleteSurfaceEquipment] = useDeleteSurfaceEquipmentMutation();

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
  const [filteredTable, setFilteredTable] = useState([
    {
      surfaceEquipment: '',
      description: '',
    },
  ]);
  const header = ['EQUIPAMENTOS DE SUPERFÍCIE', 'DESCRIÇÃO', 'AÇÕES'];
  const footer = [''];
  // const footer = ['PACKER FLUID - 9.8 lb/gal'];
  //

  useEffect(() => {
    dispacth(setSurfaceEquipment(surfaceEquipmentTable));
    setFilteredTable(surfaceEquipmentTable);
  }, []);

  useEffect(() => {
    dispacth(setSurfaceEquipment(surfaceEquipmentTable));
    setFilteredTable(surfaceEquipmentTable);
  }, [surfaceEquipmentTable]);

  const ToDelete = (equipment: SurfaceEquipment) => {
    const payload = usePayload('schematic-well-surface-equipments', 'DELETE', equipment.hash);
    deleteSurfaceEquipment(payload);
  };

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
                  <ModalDeletar equipment={tableLine} toDelete={ToDelete} />
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
