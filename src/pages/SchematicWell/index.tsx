import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

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
import SchematicXmasTreeSVG from 'assets/xmas-tree-schematic.svg';
import { useGetCommentsQuery } from 'features/api/services/schematicWell/commentsCRUD';
import { useGetSchematicConfigQuery } from 'features/api/services/schematicWell/schematicConfigCRUD';
import { useGetSubsurfaceEquipmentsQuery } from 'features/api/services/schematicWell/subsurfaceEquipmentsCRUD';
import { useGetSurfaceEquipmentsQuery } from 'features/api/services/schematicWell/surfaceEquipmentsCRUD';
import { Comment, SubsurfaceEquipment, SurfaceEquipment } from 'features/schematicWell/interfaces';
import {
  surfaceRelativeCoordinates,
  subsurfaceRelativeCoordinates,
  schematicWellState,
  setSubsurfaceComments,
  setSurfaceComments,
  setMaxDepth,
  setMinDepth,
  setSubsurfaceEquipment,
  setSurfaceEquipment,
} from 'features/schematicWell/schematicWellSlice';
import { Well } from 'features/wells/interfaces';

import EscalaAlturaArvoreNatal from 'components/EscalasEsquematico/EscalaAlturaArvoreNatal';
import EscalaProfundidadeEsquematico from 'components/EscalasEsquematico/EscalaProfundidadeEsquematico';
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
  const { subsurfaceEquipmentTable, subsurfaceComments, maxDepth, surfaceEquipmentTable, maxHeight, surfaceComments } =
    useSelector(schematicWellState);
  const { well } = useLocation().state as { well: Well };

  // Dados para requisição dos equipamentos de subsuperfície

  const payloadSubsurface = usePayload(
    'schematic-well-subsurface-equipments',
    'GETBYFILTER',
    {},
    { 'well.id': well._id },
  );
  const payloadSurface = usePayload('schematic-well-surface-equipments', 'GETBYFILTER', {}, { 'well.id': well._id });
  const payloadComments = usePayload('schematic-well-comments', 'GETBYFILTER', {}, { 'well.id': well._id });
  const payloadConfig = usePayload('schematic-well-config', 'GETBYFILTER', {}, { 'well.id': well._id });

  const subSurfaceEquipmentsRequest = useGetSubsurfaceEquipmentsQuery(payloadSubsurface);
  const surfaceEquipmentsRequest = useGetSurfaceEquipmentsQuery(payloadSurface);
  const commentsRequest = useGetCommentsQuery(payloadComments);
  const configRequest = useGetSchematicConfigQuery(payloadConfig);

  //

  const modalProps = { isOpen, onOpen, onClose };

  // Tamanho da escala da imagem do esquemático
  const imageSize = {
    schematic: {
      width: 400,
      height: 1000,
    },
    tree: {
      width: 460,
      height: 486,
    },
  };

  useEffect(() => {
    if (subSurfaceEquipmentsRequest.data?.documents) {
      dispatch(setSubsurfaceEquipment(subSurfaceEquipmentsRequest.data?.documents));
    }
    if (surfaceEquipmentsRequest.data?.documents) {
      dispatch(setSurfaceEquipment(surfaceEquipmentsRequest.data?.documents));
    }
    if (commentsRequest.data?.documents) {
      dispatch(setSubsurfaceComments(commentsRequest.data?.documents));
      dispatch(setSurfaceComments(commentsRequest.data?.documents));
    }
    if (configRequest.data?.document) {
      dispatch(setMaxDepth(configRequest.data?.document.maxDepth));
    }
    dispatch(setMinDepth());
  }, [subSurfaceEquipmentsRequest.data, surfaceEquipmentsRequest.data, commentsRequest.data, configRequest.data]);

  const isLoading =
    subSurfaceEquipmentsRequest.isLoading ||
    surfaceEquipmentsRequest.isLoading ||
    commentsRequest.isLoading ||
    subSurfaceEquipmentsRequest.isFetching ||
    surfaceEquipmentsRequest.isFetching ||
    commentsRequest.isFetching ||
    configRequest.isLoading ||
    configRequest.isFetching;

  if (isLoading) {
    return (
      <GridLayout>
        <Loading />
      </GridLayout>
    );
  }

  const error =
    subSurfaceEquipmentsRequest.error || surfaceEquipmentsRequest.error || commentsRequest.error || configRequest.error;
  if (error) {
    return (
      <GridLayout>
        <RequestError />
      </GridLayout>
    );
  }

  return (
    <>
      <GridLayout title={well.nome_poco} goToPage={'/esquematico-well/lista-pocos'}>
        <ModalDecisao modalProps={modalProps} />
        <Flex
          justify={'space-between'}
          direction={{ base: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'row' }}
          flex={1}
        >
          <Flex direction={'column'} flex={1}>
            <Flex>
              <EscalaAlturaArvoreNatal height={imageSize.tree.height} width={imageSize.tree.width}>
                <Image
                  onClick={(event) => {
                    dispatch(surfaceRelativeCoordinates(event));
                    onOpen();
                  }}
                  src={SchematicXmasTreeSVG}
                  h={imageSize.tree.height}
                />

                <Flex>
                  {surfaceEquipmentTable.length
                    ? surfaceEquipmentTable.map((equipment: SurfaceEquipment, index: number) => (
                        <ButtonPontoDeClique
                          isSurface={true}
                          surfaceEquipment={equipment}
                          key={index}
                          position={{
                            scaleYAxis: (equipment.height * imageSize.tree.height) / maxHeight,
                            xAxis: equipment.xAxis,
                            yAxis: Number(equipment.height),
                          }}
                          onOpen={onOpen}
                        />
                      ))
                    : null}
                  {surfaceComments.length
                    ? surfaceComments.map((comment: Comment, index: number) => (
                        <ButtonPontoDeClique
                          isSurface={true}
                          comment={comment}
                          key={index}
                          position={{
                            scaleYAxis: (comment.yAxis * imageSize.tree.height) / maxHeight,
                            xAxis: comment.xAxis,
                            yAxis: comment.yAxis,
                          }}
                          onOpen={onOpen}
                        />
                      ))
                    : null}
                </Flex>
              </EscalaAlturaArvoreNatal>
            </Flex>
            <Flex flex={1}>
              <EscalaProfundidadeEsquematico>
                <Image
                  onClick={(event) => {
                    dispatch(subsurfaceRelativeCoordinates(event));
                    onOpen();
                  }}
                  src={SchematicSVG}
                  h={imageSize.schematic.height}
                />

                <Flex direction={'row-reverse'}>
                  {subsurfaceEquipmentTable.length
                    ? subsurfaceEquipmentTable.map((equipment: SubsurfaceEquipment, index: number) => (
                        <ButtonPontoDeClique
                          isSurface={false}
                          subsurfaceEquipment={equipment}
                          key={index}
                          position={{
                            scaleYAxis: (Number(equipment.depth) * imageSize.schematic.height) / maxDepth,
                            xAxis: equipment.xAxis,
                            yAxis: Number(equipment.depth),
                          }}
                          onOpen={onOpen}
                        />
                      ))
                    : null}
                  {subsurfaceComments.length
                    ? subsurfaceComments.map((comment: Comment, index: number) => (
                        <ButtonPontoDeClique
                          isSurface={false}
                          comment={comment}
                          key={index}
                          position={{
                            scaleYAxis: (comment.yAxis * imageSize.schematic.height) / maxDepth,
                            xAxis: comment.xAxis,
                            yAxis: comment.yAxis,
                          }}
                          onOpen={onOpen}
                        />
                      ))
                    : null}
                </Flex>
              </EscalaProfundidadeEsquematico>
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
      </GridLayout>
    </>
  );
}

export default SchematicWell;
