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
  setComments,
  setMaxDepth,
  setSubsurfaceEquipment,
  setSurfaceEquipment,
} from 'features/schematicWell/schematicWellSlice';
import { useGetCommentsQuery } from 'features/schematicWell/service/commentsCRUD';
import { useGetSubsurfaceEquipmentsQuery } from 'features/schematicWell/service/subSurfaceEquimentsCRUD';
import { useGetSurfaceEquipmentsQuery } from 'features/schematicWell/service/surfaceEquimentsCRUD';
import { BarChart, CartesianGrid, YAxis } from 'recharts';

import Header from 'components/Header';
import RequestError from 'components/RequestError';
import { RingLoading } from 'components/RingLoading';

import ButtonPontoDeClique from './components/ButtonPontoDeClique';
import ModalDecisao from './components/ModalDecisao';
import TabelaEquipamentoSubsuperficie from './components/TabelaEquipamentoSubSuperficie';
import TabelaEquipamentoSuperficie from './components/TabelaEquipamentoSuperficie';

function SchematicWell() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { subsurfaceEquipmentTable, comments } = useSelector(schematicWellState);

  // Dados para requisição dos equipamentos de subsuperfície
  const DATA_SOURCE = `${process.env.REACT_APP_DATA_SOURCE_ID}`;
  const DATABASE = `${process.env.REACT_APP_DATABASE}`;

  const payloadSubsurface = {
    dataSource: DATA_SOURCE,
    database: DATABASE,
    collection: 'schematic-well-subsurface-equipments',
    filter: {},
  };

  const payloadSurface = {
    dataSource: DATA_SOURCE,
    database: DATABASE,
    collection: 'schematic-well-surface-equipments',
    filter: {},
  };

  const payloadComments = {
    dataSource: DATA_SOURCE,
    database: DATABASE,
    collection: 'schematic-well-comments',
    filter: {},
  };

  const subSurfaceEquipmentsRequest = useGetSubsurfaceEquipmentsQuery(payloadSubsurface);
  const surfaceEquipmentsRequest = useGetSurfaceEquipmentsQuery(payloadSurface);
  const commentsRequest = useGetCommentsQuery(payloadComments);
  //

  const modalProps = { isOpen, onOpen, onClose };

  // console.log('subSurfaceEquipments', subSurfaceEquipments);

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
    if (!subSurfaceEquipmentsRequest.isLoading && subSurfaceEquipmentsRequest.data?.documents) {
      dispatch(setSubsurfaceEquipment(subSurfaceEquipmentsRequest.data?.documents));
    }
    if (!surfaceEquipmentsRequest.isLoading && surfaceEquipmentsRequest.data?.documents) {
      dispatch(setSurfaceEquipment(surfaceEquipmentsRequest.data?.documents));
    }
    if (!commentsRequest.isLoading && commentsRequest.data?.documents) {
      dispatch(setComments(commentsRequest.data?.documents));
    }
  }, [subSurfaceEquipmentsRequest.data, surfaceEquipmentsRequest.data, commentsRequest.data]);

  if (subSurfaceEquipmentsRequest.isLoading || surfaceEquipmentsRequest.isLoading || commentsRequest.isLoading) {
    return (
      <Header>
        <RingLoading />
      </Header>
    );
  }

  if (subSurfaceEquipmentsRequest.error || surfaceEquipmentsRequest.error || commentsRequest.error) {
    return (
      <Header>
        <RequestError />
      </Header>
    );
  }

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
                      scaleYAxis: (Number(equipment.depth) * imageSize.height) / maxDepth[0].depth,
                      xAxis: equipment.xAxis,
                      yAxis: Number(equipment.depth),
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
                      scaleYAxis: (comment.depth * imageSize.height) / maxDepth[0].depth,
                      xAxis: comment.xAxis,
                      yAxis: comment.depth,
                    }}
                    onOpen={onOpen}
                  />
                ))}
            </Flex>
          </Flex>
          <Flex direction={'column'} flex={2} overflowX={'scroll'} gap={4} pt={{ base: 5, sm: 5, md: 5, lg: 5, xl: 0 }}>
            <Accordion defaultIndex={[0, 1]} allowMultiple flex={2}>
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
