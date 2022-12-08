import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';

import { Flex, IconButton, Td, Text, Tr } from '@chakra-ui/react';

import TabelaGenerica from 'components/TabelaGenerica';

function ExemploDeUtilizacao() {
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
      id: 1,
      licao_aprendida: 'Lição aprendida 1',
      data: '01/01/2021',
      acao_e_recomendacao: 'Ação e recomendação 1',
    },
  ]);
  const header = ['ID', 'LIÇÃO APRENDIDA', 'DATA', 'AÇÕES E RECOMENDAÇÕES', 'AÇÕES'];
  const footer = ['TOTAL', `${tabelaFiltrada.length} lições aprendidas`];
  //
  useEffect(() => {
    setTabelaFiltrada([
      {
        id: 1,
        licao_aprendida: 'Lição aprendida 1',
        data: '01/01/2021',
        acao_e_recomendacao: 'Ação e recomendação 1',
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
                <Text>{linhaTabela.id}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Text>{linhaTabela.licao_aprendida}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Text>{linhaTabela.data}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Text>{linhaTabela.acao_e_recomendacao}</Text>
              </Td>
              <Td textAlign={'center'} fontWeight={'semibold'}>
                <Flex gap={2} align={'center'} justify={'center'}>
                  <IconButton
                    aria-label="Botão de Editar"
                    icon={<FiTrash />}
                    borderRadius={'10px'}
                    background={'transparent'}
                    color={'red.500'}
                    _hover={{
                      background: 'red.500',
                      transition: 'all 0.4s',
                      color: 'white',
                    }}
                    onClick={() => {}}
                  />
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
    <Flex w={'100%'} direction={'column'} gap={2}>
      <TabelaGenerica data={tabelaFiltrada} header={header} fromTo={fromTo} footer={footer}>
        <Body />
      </TabelaGenerica>
    </Flex>
  );
}

export default ExemploDeUtilizacao;
