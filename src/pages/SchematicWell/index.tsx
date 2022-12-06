import React, { useRef, useState } from 'react';

import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react';
// import schematic from 'assets/schematic-well.png';
import SchematicSVG from 'assets/esquematico.svg';
import { BarChart, CartesianGrid, YAxis } from 'recharts';

import ContainerPagina from 'components/ContainerPagina';
import Sidebar from 'components/SideBar';
import TituloPagina from 'components/TituloPagina';

import { useWindowSize } from 'hooks/useWindowSize';

import ModalCadastroComentarios from './components/ModalCadastroComentarios';
// import ModalCadastroEquipSubSuperficie from './components/ModalCadastroEquipSubSuperficie';

function SchematicWell() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalProps = { isOpen, onOpen, onClose };
  // Posição do mouse no momento do click da imagem do esquemático
  const [mousePosition, setMousePosition] = useState({
    yAxis: 0,
    xAxis: 0,
  });

  // Tamanho da escala da imagem do esquemático
  const [width, height] = useWindowSize();
  const imageSize = {
    width: 400,
    height: 1000,
  };
  const checkHeight = imageSize.width * (width / imageSize.height) > height;
  const scale = checkHeight ? height / imageSize.width : width / imageSize.height;

  // Altura da imagem do esquemático
  const imageRef = useRef<any>(0);

  // Função que seta a posição do mouse no momento do click
  function relativeCoordinates(event: any) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setMousePosition({
      yAxis: Number(y.toFixed(0)),
      xAxis: Number(x.toFixed(0)),
    });
  }

  // Dados para o eixo Y
  const profundidadeMaxima = [
    {
      profundidade: 1000,
    },
  ];

  // console.log('imageSize', imageSize);
  // console.log('profundidadeMaxima', profundidadeMaxima[0].profundidade);

  return (
    <>
      <Sidebar>
        <ContainerPagina>
          <TituloPagina botaoVoltar>Esquemático Well</TituloPagina>
          <Flex>
            <Box position={'absolute'} zIndex={0}>
              <BarChart
                width={Number((imageSize.width + 130) * scale)}
                height={Number(imageSize.height * scale)}
                data={profundidadeMaxima}
              >
                <CartesianGrid strokeDasharray="4 4" />
                <YAxis dataKey="profundidade" reversed={true} tickCount={5} />
              </BarChart>
            </Box>
            <Image
              ref={imageRef}
              onClick={(event: any): void => {
                relativeCoordinates(event);
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
          {/* <ModalCadastroEquipSubSuperficie modalProps={modalProps} mousePosition={mousePosition} /> */}
          <ModalCadastroComentarios modalProps={modalProps} mousePosition={mousePosition} />
        </ContainerPagina>
      </Sidebar>
    </>
  );
}

export default SchematicWell;
