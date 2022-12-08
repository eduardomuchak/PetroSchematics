import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import { Flex, IconButton, Select, Text } from '@chakra-ui/react';

interface FromTo {
  from: number; // Inicio da paginação
  to: number; // Fim da paginação
  setFrom: React.Dispatch<React.SetStateAction<number>>; // Função para setar o inicio da paginação
  setTo: React.Dispatch<React.SetStateAction<number>>; // Função para setar o fim da paginação
}

interface Props {
  data: any; // Dados da tabela
  fromTo: FromTo; // Objeto com estados (useState's) que controlam a paginação
}

function PaginacaoTabela({ data, fromTo }: Props) {
  const { from, to, setFrom, setTo } = fromTo;

  const [pagAtual, setPagAtual] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);

  const innerWidth = window.innerWidth;

  const totalRegs = data.length; // Total de registros
  const maxPage = Math.ceil(totalRegs / perPage); // Total de páginas

  // Função para setar a paginação
  const paginate = (pag: number) => {
    setPagAtual(pag);

    const x = (pag - 1) * perPage;
    const y = (pag - 1) * perPage + perPage;
    setFrom(x);
    setTo(y);
  };

  // Função para setar a quantidade de registros por página
  const changePerPage = (value: number) => {
    setPerPage(value);
    const x = perPage;
    const y = perPage + perPage;
    setFrom(x);
    setTo(y);
  };

  // Função para setar a paginação para a próxima página
  const advance = () => {
    if (pagAtual == maxPage) {
      return;
    }

    const pag = pagAtual + 1;

    paginate(pag);
  };

  // Função para setar a paginação para a página anterior
  const back = () => {
    if (pagAtual == 1) {
      return;
    }
    const pag = pagAtual - 1;
    paginate(pag);
  };

  useEffect(() => {
    paginate(pagAtual);
  }, [from, to]);

  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={innerWidth > 428 ? 'end' : 'center'}
        gap={2}
        flex={1}
        wrap={innerWidth > 428 ? 'nowrap' : 'wrap'}
      >
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'14px'}>Por página:</Text>
          <Select h={'32px'} w={'120px'} onChange={(e) => changePerPage(+e.target.value)}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Select>

          <Text fontSize={'14px'}>
            {from === 0 ? '1' : from + 1} - {data.length < to ? data.length : to} de {data.length}
          </Text>
        </Flex>
        <Flex gap={2}>
          <IconButton
            aria-label=""
            icon={<FiChevronsLeft />}
            onClick={() => paginate(1)}
            variant="ghost"
            size="lg"
            h={'24px'}
            _hover={{
              background: 'origem.500',
              transition: 'all 0.4s',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
          <IconButton
            aria-label=""
            icon={<FiChevronLeft onClick={back} />}
            variant="ghost"
            size="lg"
            h={'24px'}
            _hover={{
              background: 'origem.500',
              transition: 'all 0.4s',
              color: 'white',
              fontWeight: 'bold',
            }}
          />

          <IconButton
            aria-label=""
            icon={<FiChevronRight />}
            onClick={advance}
            variant="ghost"
            size="lg"
            h={'24px'}
            _hover={{
              background: 'origem.500',
              transition: 'all 0.4s',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
          <IconButton
            aria-label=""
            icon={<FiChevronsRight />}
            onClick={() => paginate(maxPage)}
            variant="ghost"
            size="lg"
            h={'24px'}
            _hover={{
              background: 'origem.500',
              transition: 'all 0.4s',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default PaginacaoTabela;
