import { ReactNode } from 'react';

import { Flex, Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

import PaginacaoTabela from '../PaginacaoTabela';

interface FromTo {
  from: number; // Inicio da paginação
  to: number; // Fim da paginação
  setFrom: React.Dispatch<React.SetStateAction<number>>; // Função para setar o inicio da paginação
  setTo: React.Dispatch<React.SetStateAction<number>>; // Função para setar o fim da paginação
}

interface Props {
  data: any; // Dados completos da tabela
  fromTo: FromTo; // Dados de paginação
  children: ReactNode; // Dados do corpo da tabela
  header: string[]; // Dados do cabeçalho da tabela
  footer?: string[]; // Dados do rodapé da tabela
  maxHeight?: string; // Altura da tabela
  minHeight?: string; // Altura da tabela
  pagination?: boolean; // Se a tabela terá paginação
}

function TabelaGenerica({ data, children, header, footer, fromTo, maxHeight, minHeight, pagination }: Props) {
  if (footer && footer.length < header.length) {
    const diferenca = header.length - footer.length;
    for (let index = 0; index < diferenca; index += 1) {
      footer.push('');
    }
  }

  return (
    <Flex direction={'column'} w={'100%'}>
      <Flex direction={'column'} flex={1}>
        <TableContainer
          mt={1}
          borderRadius={'10px'}
          overflowX={'auto'}
          minH={minHeight}
          maxH={maxHeight}
          overflowY={maxHeight ? 'scroll' : 'hidden'}
        >
          <Table variant="striped" colorScheme={'strippedGray'}>
            <Thead>
              <Tr background={'origem.500'}>
                {header.map((item: string, index: number) => (
                  <Th color="white" textAlign={'center'} key={index}>
                    {item}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody scrollBehavior={'smooth'}>{children}</Tbody>
            {footer && (
              <Tfoot>
                <Tr background={'origem.500'}>
                  {footer.map((item: string, index: number) => (
                    <Th color="white" key={index}>
                      {item}
                    </Th>
                  ))}
                </Tr>
              </Tfoot>
            )}
          </Table>
        </TableContainer>
      </Flex>
      {pagination && <PaginacaoTabela data={data} fromTo={fromTo} />}
    </Flex>
  );
}

export default TabelaGenerica;
