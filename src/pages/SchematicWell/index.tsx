import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
  setSubsurfaceEquipment,
  setSurfaceEquipment,
} from 'features/schematicWell/schematicWellSlice';
import {
  useGetCommentsQuery,
  useGetSubsurfaceEquipmentsQuery,
  useGetSurfaceEquipmentsQuery,
} from 'features/schematicWell/service/schematicWellApi';

import EscalaProfundidadeEsquematico from 'components/EscalaProfundidadeEsquematico';
import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';
import RequestError from 'components/RequestError';

import { usePayload } from 'hooks/usePayload';

import ButtonPontoDeClique from './components/ButtonPontoDeClique';
import ModalDecisao from './components/ModalDecisao';
import TabelaEquipamentoSubsuperficie from './components/TabelaEquipamentoSubSuperficie';
import TabelaEquipamentoSuperficie from './components/TabelaEquipamentoSuperficie';

function SchematicWell() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { subsurfaceEquipmentTable, comments, maxDepth } = useSelector(schematicWellState);

  // Dados para requisição dos equipamentos de subsuperfície

  const payloadSubsurface = usePayload('schematic-well-subsurface-equipments', 'GET');
  const payloadSurface = usePayload('schematic-well-surface-equipments', 'GET');
  const payloadComments = usePayload('schematic-well-comments', 'GET');

  const subSurfaceEquipmentsRequest = useGetSubsurfaceEquipmentsQuery(payloadSubsurface);
  const surfaceEquipmentsRequest = useGetSurfaceEquipmentsQuery(payloadSurface);
  const commentsRequest = useGetCommentsQuery(payloadComments);

  //

  const modalProps = { isOpen, onOpen, onClose };

  // Tamanho da escala da imagem do esquemático
  const imageSize = {
    width: 400,
    height: 1000,
  };

  useEffect(() => {
    if (subSurfaceEquipmentsRequest.data?.documents) {
      dispatch(setSubsurfaceEquipment(subSurfaceEquipmentsRequest.data?.documents));
    }
    if (surfaceEquipmentsRequest.data?.documents) {
      dispatch(setSurfaceEquipment(surfaceEquipmentsRequest.data?.documents));
    }
    if (commentsRequest.data?.documents) {
      dispatch(setComments(commentsRequest.data?.documents));
    }
  }, [subSurfaceEquipmentsRequest.data, surfaceEquipmentsRequest.data, commentsRequest.data]);

  const isLoading =
    subSurfaceEquipmentsRequest.isLoading ||
    surfaceEquipmentsRequest.isLoading ||
    commentsRequest.isLoading ||
    subSurfaceEquipmentsRequest.isFetching ||
    surfaceEquipmentsRequest.isFetching ||
    commentsRequest.isFetching;

  if (isLoading) {
    return (
      <GridLayout>
        <Loading />
      </GridLayout>
    );
  }

  const error = subSurfaceEquipmentsRequest.error || surfaceEquipmentsRequest.error || commentsRequest.error;
  if (error) {
    return (
      <GridLayout>
        <RequestError />
      </GridLayout>
    );
  }

  return (
    <>
      <GridLayout>
        <ModalDecisao modalProps={modalProps} />
        <Flex
          justify={'space-between'}
          direction={{ base: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'row' }}
        >
          {maxDepth === 0 ? (
            <Flex flex={1}>
              <Link to={'/esquematico-well-config'}>
                <Box position={'absolute'} zIndex={0}>
                  <Text textAlign={'center'} fontWeight={700}>
                    Configure a profundidade máxima do esquemático!
                  </Text>
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
                  top={10}
                  left={10}
                />
              </Link>
            </Flex>
          ) : (
            <Flex flex={1}>
              <EscalaProfundidadeEsquematico>
                <Image
                  onClick={(event) => {
                    dispatch(relativeCoordinates(event));
                    onOpen();
                  }}
                  src={SchematicSVG}
                  h={imageSize.height}
                />

                <Flex direction={'row-reverse'}>
                  {subsurfaceEquipmentTable.length
                    ? subsurfaceEquipmentTable.map((equipment: SubsurfaceEquipment, index: number) => (
                        <ButtonPontoDeClique
                          subsurfaceEquipment={equipment}
                          key={index}
                          position={{
                            scaleYAxis: (Number(equipment.depth) * imageSize.height) / maxDepth,
                            xAxis: equipment.xAxis,
                            yAxis: Number(equipment.depth),
                          }}
                          onOpen={onOpen}
                        />
                      ))
                    : null}
                  {comments.length
                    ? comments.map((comment: Comment, index: number) => (
                        <ButtonPontoDeClique
                          comment={comment}
                          key={index}
                          position={{
                            scaleYAxis: (comment.depth * imageSize.height) / maxDepth,
                            xAxis: comment.xAxis,
                            yAxis: comment.depth,
                          }}
                          onOpen={onOpen}
                        />
                      ))
                    : null}
                </Flex>
              </EscalaProfundidadeEsquematico>
            </Flex>
          )}

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
      </GridLayout>
    </>
  );
}

export default SchematicWell;
