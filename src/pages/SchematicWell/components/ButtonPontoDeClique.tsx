import { useDispatch } from 'react-redux';

import { Box } from '@chakra-ui/react';
import { SubsurfaceEquipment } from 'features/schematicWell/interfaces';
import { openPointOfClick } from 'features/schematicWell/schematicWellSlice';

interface Position {
  xAxis: number;
  yAxis: number;
  scaleYAxis: number;
}

interface Props {
  position: Position;
  onOpen: () => void;
  subsurfaceEquipment?: SubsurfaceEquipment;
}

function ButtonPontoDeClique({ position, onOpen, subsurfaceEquipment }: Props) {
  const { yAxis, xAxis, scaleYAxis } = position;
  const dispacth = useDispatch();

  // const HoverPopover = () => (
  //   <Box position="absolute" top={scaleYAxis} right={xAxis} w="100px" h="100px" bg="red" zIndex={1} />
  // );

  return (
    <Box
      as="button"
      height={'24px'}
      width={'24px'}
      transition="all 0.4s ease"
      border="2px"
      borderRadius={'50%'}
      bg="#FEFEFE"
      borderColor="origem.500"
      boxShadow="0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
      _hover={{ bg: 'origem.500', borderColor: 'origem.600' }}
      _active={{
        bg: 'origem.400',
        transform: 'scale(0.95)',
        borderColor: 'origem.600',
        boxShadow: '0 0 2px 4px rgba(88, 144, 255, .75), 0 2px 2px rgba(0, 0, 0, .15)',
      }}
      position={'relative'}
      right={xAxis}
      top={scaleYAxis}
      zIndex={2}
      onClick={() => {
        dispacth(openPointOfClick({ yAxis, xAxis }));
        onOpen();
      }}
    />
  );
}

export default ButtonPontoDeClique;
