import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';

import { Flex, IconButton, Td, Text, Tr } from '@chakra-ui/react';

import TabelaGenerica from 'components/TabelaGenerica';

function TabelaEquipamentoSuperficie() {
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
      equipamentoDeSuperficie: '',
      descricao: '',
    },
  ]);
  const header = ['EQUIPAMENTOS DE SUPERFÍCIE', 'DESCRIÇÃO', 'AÇÕES'];
  const footer = ['PACKER FLUID - 9.8 lb/gal'];
  //
  useEffect(() => {
    setTabelaFiltrada([
      {
        equipamentoDeSuperficie: 'Árvore de Natal',
        descricao: 'Descrição da árvore',
      },
      {
        equipamentoDeSuperficie: 'Adaptador da Cabeça de Produção',
        descricao: 'Descrição do adaptador',
      },
      {
        equipamentoDeSuperficie: 'Suspensor da Cabeca de Produção',
        descricao: 'Descrição do suspensor',
      },
      {
        equipamentoDeSuperficie: 'Cabeça de Produção',
        descricao: 'Descrição da cabeça de produção',
      },
      {
        equipamentoDeSuperficie: 'Cabeça de Revestimento',
        descricao: 'Descrição da cabeça de revestimento',
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
                <Text>{linhaTabela.equipamentoDeSuperficie}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'} wordBreak={'break-word'}>
                <Text>{linhaTabela.descricao}</Text>
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

export default TabelaEquipamentoSuperficie;
