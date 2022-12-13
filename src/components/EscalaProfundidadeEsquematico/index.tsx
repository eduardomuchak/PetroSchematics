import { useSelector } from 'react-redux';

import { Box, Flex, Text } from '@chakra-ui/react';
import { schematicWellState } from 'features/schematicWell/schematicWellSlice';

function EscalaProfundidadeEsquematico({ children }: { children: React.ReactNode }) {
  const { maxDepth } = useSelector(schematicWellState);

  const slices = [
    {
      scale: 0,
    },
    {
      scale: maxDepth * 0.25,
    },
    {
      scale: maxDepth * 0.5,
    },
    {
      scale: maxDepth * 0.75,
    },
    {
      scale: maxDepth,
    },
  ];

  return (
    <>
      <Flex bg={'transparent'} w={'460px'} h={'1000px'} position={'absolute'}>
        <Flex direction={'column'} justify={'space-between'} flex={1} w={'100%'} px={5}>
          {slices.map((slice, index) => (
            <Flex
              align={
                // eslint-disable-next-line no-nested-ternary
                index === 0 ? 'start' : index === slices.length - 1 ? 'end' : 'center'
              }
              gap={2}
              key={index}
            >
              <Text>{slice.scale}</Text>
              <Box
                w={'100%'}
                h={'1px'}
                backgroundImage={'linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%)'}
                backgroundPosition={'top'}
                backgroundSize={'10px 1px'}
                backgroundRepeat={'repeat-x'}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex position={'relative'} left={75}>
        {children}
      </Flex>
    </>
  );
}

export default EscalaProfundidadeEsquematico;
