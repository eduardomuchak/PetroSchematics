import { useSelector } from 'react-redux';

import { Box, Flex, Text } from '@chakra-ui/react';
import { schematicWellState } from 'features/schematicWell/schematicWellSlice';

function EscalaAlturaArvoreNatal({
  children,
  height,
  width,
}: {
  children: React.ReactNode;
  height: number;
  width: number;
}) {
  const { maxHeight } = useSelector(schematicWellState);

  const slices = [
    {
      scale: 0,
    },
    {
      scale: (maxHeight * 0.5).toString().replace('.', ','),
    },
    {
      scale: maxHeight,
    },
  ];

  return (
    <>
      <Flex bg={'transparent'} w={`${width}px`} h={`${height}px`} position={'absolute'}>
        <Flex direction={'column-reverse'} justify={'space-between'} flex={1} w={'100%'} px={5}>
          {slices.map((slice, index) =>
            slice.scale === 0 ? (
              <Flex key={index} h={'24px'} />
            ) : (
              <Flex
                align={
                  // eslint-disable-next-line no-nested-ternary
                  index === 0 ? 'end' : index === slices.length - 1 ? 'start' : 'center'
                }
                gap={2}
                key={index}
              >
                <Text>{slice.scale}m</Text>
                <Box
                  w={'100%'}
                  h={'1px'}
                  backgroundImage={'linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%)'}
                  backgroundPosition={'top'}
                  backgroundSize={'10px 1px'}
                  backgroundRepeat={'repeat-x'}
                />
              </Flex>
            ),
          )}
        </Flex>
      </Flex>
      <Flex position={'relative'} left={75}>
        {children}
      </Flex>
    </>
  );
}

export default EscalaAlturaArvoreNatal;
