import { useEffect, useRef, useState } from 'react';

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
  const checkHeight = 833 * (width / 1500) > height - 100;
  const scale = checkHeight ? height / 893 : width / 1500;

  const [imageHeight, setImageHeight] = useState<any>(0);
  const imageRef = useRef<any>(0);

  const dataProdundidade = [
    {
      profundidade: imageHeight,
    },
  ];

  useEffect(() => {
    setImageHeight(imageRef.current.clientHeight);
  }, []);

  // console.log('imageHeight', imageHeight);
  // console.log('X:', mousePosition.xAxis);
  // console.log('Y:', mousePosition.yAxis);

  return (
    <>
      <Flex>
        <Box position={'absolute'} zIndex={0}>
          <BarChart width={Number(630 * scale)} height={Number(1000 * scale)} data={dataProdundidade}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="profundidade" reversed={true} tickCount={10} />
          </BarChart>
        </Box>
        <Image
          ref={imageRef}
          onClick={(e: any) => {
            setMousePosition({
              yAxis: e.clientY - e.target.offsetTop,
              xAxis: e.clientX - e.target.offsetLeft,
            });
          }}
          src={schematic}
          display="flex"
          align="center"
          w={`${400 * scale}px`}
          h={`${990 * scale}px`}
          justifyContent="center"
          zIndex={1}
          position={'relative'}
          top={1}
          left={150}
        />
      </Flex>
      <Text>{`Clique Eixo Y: ${mousePosition.yAxis}`}</Text>
      <Text>{`Clique Eixo X: ${mousePosition.xAxis}`}</Text>
    </>
  );
}

export default SchematicWell;
