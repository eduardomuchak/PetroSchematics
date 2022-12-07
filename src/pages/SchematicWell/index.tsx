import { useDispatch } from 'react-redux';

import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react';
import SchematicSVG from 'assets/esquematico.svg';
import { relativeCoordinates } from 'features/SchematicWell/schematicWellSlice';
import { BarChart, CartesianGrid, YAxis } from 'recharts';

import ContainerPagina from 'components/ContainerPagina';
import Sidebar from 'components/SideBar';
import TituloPagina from 'components/TituloPagina';

import { useWindowSize } from 'hooks/useWindowSize';

import ModalDecisao from './components/ModalDecisao';

function SchematicWell() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalProps = { isOpen, onOpen, onClose };

  // Tamanho da escala da imagem do esquemático
  const [width, height] = useWindowSize();
  const imageSize = {
    width: 400,
    height: 1000,
  };
  const checkHeight = imageSize.width * (width / imageSize.height) > height;
  const scale = checkHeight ? height / imageSize.width : width / imageSize.height;

  // Dados para o eixo Y
  const profundidadeMaxima = [
    {
      profundidade: 1000,
    },
  ];

  return (
    <>
      <Sidebar>
        <ContainerPagina>
          <TituloPagina botaoVoltar>Esquemático Well</TituloPagina>
          <Flex>
            <Box position={'absolute'} zIndex={0}>
              <BarChart
                width={Number((imageSize.width + 130) * scale)}
                height={Number(profundidadeMaxima[0].profundidade + 10)}
                data={profundidadeMaxima}
              >
                <CartesianGrid strokeDasharray="4 4" />
                <YAxis dataKey="profundidade" reversed={true} tickCount={5} />
              </BarChart>
            </Box>
            <Image
              onClick={(event) => {
                dispatch(relativeCoordinates(event));
                onOpen();
              }}
              src={SchematicSVG}
              w={`${imageSize.width * scale}px`}
              h={`${imageSize.height * scale}px`}
              maxH={profundidadeMaxima[0].profundidade}
              zIndex={1}
              position={'relative'}
              top={1}
              left={100}
            />
          </Flex>
          <ModalDecisao modalProps={modalProps} />
        </ContainerPagina>
      </Sidebar>
    </>
  );
}

export default SchematicWell;
