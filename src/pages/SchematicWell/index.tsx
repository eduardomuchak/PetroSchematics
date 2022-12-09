import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import SchematicSVG from 'assets/esquematico.svg';
import { Comment, SubsurfaceEquipment } from 'features/schematicWell/interfaces';
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
import Header from 'components/Header';
import { RingLoading } from 'components/RingLoading';
import Sidebar from 'components/SideBar';

import ButtonPontoDeClique from './components/ButtonPontoDeClique';
import ModalDecisao from './components/ModalDecisao';
import TabelaEquipamentoSubsuperficie from './components/TabelaEquipamentoSubSuperficie';
import TabelaEquipamentoSuperficie from './components/TabelaEquipamentoSuperficie';

function SchematicWell() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { subsurfaceEquipmentTable, comments } = useSelector(schematicWellState);

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
      <Header>
        <ModalDecisao modalProps={modalProps} />
        <Flex
          justify={'space-between'}
          direction={{ base: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'row' }}
        >
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
              {subsurfaceEquipmentTable.length &&
                subsurfaceEquipmentTable.map((equipment: SubsurfaceEquipment, index: number) => (
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
              {comments.length &&
                comments.map((comment: Comment, index: number) => (
                  <ButtonPontoDeClique
                    comment={comment}
                    key={index}
                    position={{
                      scaleYAxis: (comment.yAxis * imageSize.height) / maxDepth[0].depth,
                      xAxis: comment.xAxis,
                      yAxis: comment.yAxis,
                    }}
                    onOpen={onOpen}
                  />
                ))}
            </Flex>
          </Flex>
          <Flex
            direction={'column'}
            flex={1.5}
            overflowX={'scroll'}
            gap={4}
            pt={{ base: 5, sm: 5, md: 5, lg: 5, xl: 0 }}
          >
            <Accordion defaultIndex={[0]} allowMultiple flex={1.5}>
              <AccordionItem border={'none'}>
                <h2>
                  <AccordionButton borderBottom={'2px solid #9FA2B4'} borderRadius={'6px 6px 0px 0px'}>
                    <Box flex="1" textAlign="left">
                      <Text fontWeight={700}>Equipamentos de Superfície</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <TabelaEquipamentoSuperficie />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem border={'none'}>
                <h2>
                  <AccordionButton borderBottom={'2px solid #9FA2B4'} borderRadius={'6px 6px 0px 0px'}>
                    <Box flex="1" textAlign="left">
                      <Text fontWeight={700}>Equipamentos de Subsuperfície</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <TabelaEquipamentoSubsuperficie />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>
      </Header>
    </>
  );
}

export default SchematicWell;
