import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';

import { Flex, IconButton, Td, Text, Tr } from '@chakra-ui/react';

import TabelaGenerica from 'components/TabelaGenerica';

function TabelaEquipamentoSubsuperficie() {
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
  const [tabelaFiltrada, setTabelaFiltrada] = useState<any[]>([
    {
      equipamentoDeSubsuperficie: '',
      odPolegada: '',
      idPolegada: '',
      fabricante: '',
      profundidade: '',
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
    setTabelaFiltrada([
      {
        equipamentoDeSubsuperficie: '15 Tubos 2.7/8" EU',
        odPolegada: '2.7/8',
        idPolegada: '2,441',
        fabricante: 'Halliburton',
        profundidade: '135,00',
      },
      {
        equipamentoDeSubsuperficie: '1 Nipple R 2.7/8" EU',
        odPolegada: '2.7/8',
        idPolegada: '1,812',
        fabricante: 'Surco',
        profundidade: '2759,15',
      },
      {
        equipamentoDeSubsuperficie: '1 Nipple F 2.7/8" EU',
        odPolegada: '2.7/8',
        idPolegada: '1,71',
        fabricante: 'Surco',
        profundidade: '2900,60',
      },
    ]);
  }, []);

  // Criar um componente com o corpo da tabela e chamar ele como children do TabelaGenerica
  function Body() {
    return (
      <>
        {tabelaFiltrada.length ? (
          tabelaFiltrada.slice(from, to).map((linhaTabela: any, index: number) => (
            <Tr key={index}>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Text>{linhaTabela.equipamentoDeSubsuperficie}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{linhaTabela.odPolegada}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{linhaTabela.idPolegada}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{linhaTabela.fabricante}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{linhaTabela.profundidade}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Flex gap={2} align={'center'} justify={'center'}>
                  <IconButton aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditOutline" />
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
      <TabelaGenerica data={tabelaFiltrada} header={header} fromTo={fromTo} footer={footer} pagination>
        <Body />
      </TabelaGenerica>
    </Flex>
  );
}

export default TabelaEquipamentoSubsuperficie;
