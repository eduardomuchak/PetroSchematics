import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import { Flex, IconButton, Select, Text } from '@chakra-ui/react';
// import { useEffect } from 'react';

function PaginacaoTabela({ paginationBottom, setPaginationBottom, paginationShow, setPaginationShow, max }: any) {
  const handleShow = (value: any) => {
    setPaginationShow(value);
  };

  const handleBegin = () => {
    setPaginationBottom(0);
  };

  const handleBottom = () => {
    const newBottom = Number(paginationBottom) - Number(paginationShow);
    if (newBottom > 0) {
      setPaginationBottom(newBottom);
    } else {
      setPaginationBottom(0);
    }
  };

  const handleTop = () => {
    const newBottom = Number(paginationBottom) + Number(paginationShow);
    if (newBottom + Number(paginationShow) > max) {
      const newMax = Number(max) - Number(paginationShow);
      if (newMax > 0) {
        setPaginationBottom(newMax);
      } else {
        setPaginationBottom(0);
      }
    } else {
      setPaginationBottom(newBottom);
    }
  };

  const handleEnd = () => {
    const newMax = Number(max) - Number(paginationShow);
    if (newMax > 0) {
      setPaginationBottom(newMax);
    } else {
      setPaginationBottom(0);
    }
  };

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
          <Select h={'32px'} w={'120px'} onChange={(e) => handleShow(e.target.value)}>
            {/* <option value="5">5</option> */}
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Select>

          <Text fontSize={'14px'}>{`${Number(paginationBottom) + 1} - ${
            Number(paginationBottom) + Number(paginationShow) > max
              ? max
              : Number(paginationBottom) + Number(paginationShow)
          } de ${max}`}</Text>
        </Flex>
        <Flex gap={2}>
          <IconButton
            aria-label=""
            icon={<FiChevronsLeft />}
            onClick={() => handleBegin()}
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
            icon={<FiChevronLeft onClick={() => handleBottom()} />}
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
            onClick={() => handleTop()}
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
            onClick={() => handleEnd()}
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
