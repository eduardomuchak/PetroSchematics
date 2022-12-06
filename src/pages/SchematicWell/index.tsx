import React, { useRef, useState } from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import schematic from 'assets/schematic-well.png';
import { BarChart, CartesianGrid, YAxis } from 'recharts';

import { useWindowSize } from 'hooks/useWindowSize';

function SchematicWell() {
  // Posição do mouse no momento do click da imagem do esquemático
  const [mousePosition, setMousePosition] = useState({
    yAxis: 0,
    xAxis: 0,
  });

  // Tamanho da escala da imagem do esquemático
  const [width, height] = useWindowSize();
  const checkHeight = 410 * (width / 1280) > height;
  const scale = checkHeight ? height / 410 : width / 1280;

  // Altura da imagem do esquemático
  const imageRef = useRef<any>(0);

  function relativeCoords(event: any) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setMousePosition({
      yAxis: Number(y.toFixed(0)),
      xAxis: Number(x.toFixed(0)),
    });
  }

  const profundidadeMaxima = [
    {
      profundidade: 1000,
    },
  ];

  return (
    <>
      <Flex>
        <Box position={'absolute'} zIndex={0}>
          <BarChart width={Number(600 * scale)} height={1000} data={profundidadeMaxima}>
            <CartesianGrid strokeDasharray="4 4" />
            <YAxis dataKey="profundidade" reversed={true} tickCount={5} />
          </BarChart>
        </Box>
        <Image
          ref={imageRef}
          onClick={(event: any): void => {
            setMousePosition({
              yAxis: event.clientY,
              xAxis: event.clientX,
            });
            relativeCoords(event);
          }}
          src={schematic}
          display="flex"
          align="center"
          w={`${410 * scale}px`}
          h={`1000px`}
          justifyContent="center"
          zIndex={1}
          position={'relative'}
          top={-1}
          left={150}
        />
      </Flex>
      <Text>{`Clique Eixo Y: ${mousePosition.yAxis}`}</Text>
      <Text>{`Clique Eixo X: ${mousePosition.xAxis}`}</Text>
    </>
  );
}

export default SchematicWell;
