import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react';
import SchematicSVG from 'assets/esquematico.svg';
import {
  relativeCoordinates,
  schematicWellState,
  setMaxDepth,
  setSubsurfaceEquipment,
} from 'features/schematicWell/schematicWellSlice';
import { useGetSubsurfaceEquipmentsQuery } from 'features/schematicWell/service';
import { BarChart, CartesianGrid, YAxis } from 'recharts';

import ContainerPagina from 'components/ContainerPagina';
// import RequestError from 'components/RequestError';
import { RingLoading } from 'components/RingLoading';
import Sidebar from 'components/SideBar';
import TituloPagina from 'components/TituloPagina';

import ButtonPontoDeClique from './components/ButtonPontoDeClique';
import ModalDecisao from './components/ModalDecisao';
import TabelaEquipamentoSubsuperficie from './components/TabelaEquipamentoSubSuperficie';
import TabelaEquipamentoSuperficie from './components/TabelaEquipamentoSuperficie';

function SchematicWell() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { subsurfaceEquipmentTable } = useSelector(schematicWellState);

  const DATA_SOURCE = `${process.env.REACT_APP_DATA_SOURCE_ID}`;
  const DATABASE = `${process.env.REACT_APP_DATABASE}`;

  const payload = {
    dataSource: DATA_SOURCE,
    database: DATABASE,
    collection: 'form-xv',
    filter: {},
  };

  const { isLoading, data: subSurfaceEquipments } = useGetSubsurfaceEquipmentsQuery(payload);
  const modalProps = { isOpen, onOpen, onClose };

  // Tamanho da escala da imagem do esquemático
  const imageSize = {
    width: 400,
    height: 1000,
  };

  // Dados para o eixo Y
  const maxDepth = [
    {
      depth: 3000,
    },
  ];
  //

  useEffect(() => {
    dispatch(setMaxDepth(maxDepth[0].depth));
  }, []);

  useEffect(() => {
    if (!isLoading && subSurfaceEquipments) {
      dispatch(setSubsurfaceEquipment(subSurfaceEquipments));
    }
  }, [subSurfaceEquipments]);

  if (isLoading) {
    return (
      <Sidebar>
        <ContainerPagina>
          <RingLoading />
        </ContainerPagina>
      </Sidebar>
    );
  }

  // if (error) {
  //   return (
  //     <Sidebar>
  //       <ContainerPagina>
  //         <RequestError />
  //       </ContainerPagina>
  //     </Sidebar>
  //   );
  // }

  return (
    <>
      <Sidebar>
        <ContainerPagina>
          <TituloPagina botaoVoltar>Esquemático Well</TituloPagina>
          <ModalDecisao modalProps={modalProps} />
          <Flex justify={'space-between'}>
            <Flex flex={1}>
              <Box position={'absolute'} zIndex={0}>
                <BarChart width={Number(imageSize.width + 60)} height={Number(imageSize.height)} data={maxDepth}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <YAxis dataKey="depth" reversed={true} tickCount={5} />
                </BarChart>
              </Box>
              <Image
                onClick={(event) => {
                  dispatch(relativeCoordinates(event));
                  onOpen();
                }}
                src={SchematicSVG}
                h={imageSize.height}
                zIndex={1}
                position={'relative'}
                top={1}
                left={100}
              />
              <Flex direction={'row-reverse'}>
                {subsurfaceEquipmentTable.map((equipment: any, index: number) => (
                  <ButtonPontoDeClique
                    subsurfaceEquipment={equipment}
                    key={index}
                    position={{
                      scaleYAxis: (equipment.yAxis * imageSize.height) / maxDepth[0].depth,
                      xAxis: equipment.xAxis,
                      yAxis: equipment.yAxis,
                    }}
                    onOpen={onOpen}
                  />
                ))}
              </Flex>
            </Flex>
            <Flex direction={'column'} flex={1.5} overflowX={'scroll'} gap={4}>
              <TabelaEquipamentoSuperficie />
              <TabelaEquipamentoSubsuperficie />
            </Flex>
          </Flex>
        </ContainerPagina>
      </Sidebar>
    </>
  );
}

export default SchematicWell;
