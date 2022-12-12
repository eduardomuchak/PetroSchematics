import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Flex, Td, Text, Tr } from '@chakra-ui/react';
import { SubsurfaceEquipment } from 'features/schematicWell/interfaces';
import { schematicWellState, setSubsurfaceEquipment } from 'features/schematicWell/schematicWellSlice';
import { useDeleteSubsurfaceEquipmentMutation } from 'features/schematicWell/service';

import TabelaGenerica from 'components/TabelaGenerica';

import { usePayload } from 'hooks/usePayload';

import ModalDeletar from './ModalDeletar';
import ModalEditarEquipSubsuperficie from './ModalEditarEquipSubsuperficie';

function TabelaEquipamentoSubsuperficie() {
  const dispacth = useDispatch();
  const { subsurfaceEquipmentTable } = useSelector(schematicWellState);
  const [deleteSubsurfaceEquipment] = useDeleteSubsurfaceEquipmentMutation();

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
      subsurfaceEquipment: '',
      odInch: '',
      idInch: '',
      manufacturer: '',
      depth: '',
    },
  ]);
  const header = [
    'EQUIPAMENTOS DE SUBSUPERFÍCIE',
    'OD (in/pol)',
    'ID (in/pol)',
    'FABRICANTE',
    'PROFUNDIDADE (m)',
    'AÇÕES',
  ];
  const footer = [''];
  //

  useEffect(() => {
    dispacth(setSubsurfaceEquipment(subsurfaceEquipmentTable));
    setFilteredTable(subsurfaceEquipmentTable);
  }, []);

  useEffect(() => {
    dispacth(setSubsurfaceEquipment(subsurfaceEquipmentTable));
    setFilteredTable(subsurfaceEquipmentTable);
  }, [subsurfaceEquipmentTable]);

  const ToDelete = (equipment: SubsurfaceEquipment) => {
    const payload = usePayload('schematic-well-subsurface-equipments', equipment.hash, 'DELETE');
    deleteSubsurfaceEquipment(payload);
  };

  // Criar um componente com o corpo da tabela e chamar ele como children do TabelaGenerica
  function Body() {
    return (
      <>
        {filteredTable.length ? (
          filteredTable.slice(from, to).map((tableLine: any, index: number) => (
            <Tr key={index}>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Text>{tableLine.subsurfaceEquipment}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{tableLine.odInch}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{tableLine.idInch}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{tableLine.manufacturer}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{tableLine.depth}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Flex gap={2} align={'center'} justify={'center'}>
                  <ModalEditarEquipSubsuperficie equipment={tableLine} />
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

export default TabelaEquipamentoSubsuperficie;
