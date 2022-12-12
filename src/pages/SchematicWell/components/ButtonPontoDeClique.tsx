import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Flex, Text } from '@chakra-ui/react';
import { Comment, SubsurfaceEquipment } from 'features/schematicWell/interfaces';
import { openPointOfClick } from 'features/schematicWell/schematicWellSlice';
import { useDeleteCommentsMutation } from 'features/schematicWell/service/commentsCRUD';

import { usePayload } from 'hooks/usePayload';

import ModalDeletar from './ModalDeletar';
import ModalEditarComentario from './ModalEditarComentario';

interface Position {
  xAxis: number;
  yAxis: number;
  scaleYAxis: number;
}

interface Props {
  position: Position;
  onOpen: () => void;
  subsurfaceEquipment?: SubsurfaceEquipment;
  comment?: Comment;
}

function ButtonPontoDeClique({ position, onOpen, subsurfaceEquipment, comment }: Props) {
  const { yAxis, xAxis, scaleYAxis } = position;
  const dispacth = useDispatch();
  const [deleteComments] = useDeleteCommentsMutation();

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const SubSurfaceEquipamentCard = () => (
    <Box
      zIndex={3}
      position={'absolute'}
      width={'536px'}
      top={-36}
      left={8}
      backgroundColor={'#FEFEFE'}
      boxShadow={'0 0 4px rgba(0, 0, 0, 0.25)'}
      borderRadius={'4px'}
      p={5}
    >
      <Flex gap={1} mb={3}>
        <Text fontWeight={700} fontSize={'16px'}>
          Profundidade
        </Text>
        <Flex>
          <Text fontWeight={700} fontSize={'16px'}>
            {subsurfaceEquipment?.depth}
          </Text>
          <Text fontWeight={700} fontSize={'16px'}>
            m
          </Text>
        </Flex>
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          Equipamento de Subsuperfície:
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {subsurfaceEquipment?.subsurfaceEquipment}
        </Text>
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          OD (polegadas):
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {subsurfaceEquipment?.odInch}
        </Text>
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          ID (polegadas):
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {subsurfaceEquipment?.idInch}
        </Text>
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          Fabricante:
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {subsurfaceEquipment?.manufacturer}
        </Text>
      </Flex>
    </Box>
  );

  const ToDelete = (comment: Comment) => {
    const payload = usePayload('schematic-well-comments', 'DELETE', comment);
    deleteComments(payload);
  };

  const CommentCard = () => (
    <Box
      zIndex={3}
      position={'absolute'}
      width={'536px'}
      top={-20}
      left={8}
      backgroundColor={'#FEFEFE'}
      boxShadow={'0 0 4px rgba(0, 0, 0, 0.25)'}
      borderRadius={'4px'}
      p={5}
    >
      <Flex mb={3} justify={'space-between'} align={'center'}>
        <Flex gap={1}>
          <Text fontWeight={700} fontSize={'16px'}>
            Profundidade
          </Text>
          <Flex>
            <Text fontWeight={700} fontSize={'16px'}>
              {comment?.depth}
            </Text>
            <Text fontWeight={700} fontSize={'16px'}>
              m
            </Text>
          </Flex>
        </Flex>
        {comment && (
          <Flex gap={2}>
            <ModalEditarComentario comment={comment} />
            <ModalDeletar equipment={comment} toDelete={ToDelete} />
          </Flex>
        )}
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          Comentário:
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {comment?.comments}
        </Text>
      </Flex>
    </Box>
  );

  const CommentAndSubSurfaceEquipamentCard = () => (
    <Box
      zIndex={3}
      position={'absolute'}
      width={'536px'}
      top={-36}
      left={8}
      backgroundColor={'#FEFEFE'}
      boxShadow={'0 0 4px rgba(0, 0, 0, 0.25)'}
      borderRadius={'4px'}
      p={5}
    >
      <Flex gap={1} mb={3}>
        <Text fontWeight={700} fontSize={'16px'}>
          Profundidade
        </Text>
        <Flex>
          <Text fontWeight={700} fontSize={'16px'}>
            {subsurfaceEquipment?.depth}
          </Text>
          <Text fontWeight={700} fontSize={'16px'}>
            m
          </Text>
        </Flex>
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          Equipamento de Subsuperfície:
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {subsurfaceEquipment?.subsurfaceEquipment}
        </Text>
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          OD (polegadas):
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {subsurfaceEquipment?.odInch}
        </Text>
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          ID (polegadas):
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {subsurfaceEquipment?.idInch}
        </Text>
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          Fabricante:
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {subsurfaceEquipment?.manufacturer}
        </Text>
      </Flex>
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          Comentário:
        </Text>

        <Text fontWeight={500} fontSize={'16px'}>
          {comment?.comments}
        </Text>
      </Flex>
    </Box>
  );

  return (
    <Flex
      position={'relative'}
      right={xAxis - 80}
      top={scaleYAxis - 12}
      zIndex={2}
      height={'24px'}
      width={'30px'}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
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
        onClick={() => {
          dispacth(openPointOfClick({ yAxis, xAxis }));
          onOpen();
        }}
      />
      {isHovering && subsurfaceEquipment && comment && <CommentAndSubSurfaceEquipamentCard />}
      {isHovering && subsurfaceEquipment && <SubSurfaceEquipamentCard />}
      {isHovering && comment && <CommentCard />}
    </Flex>
  );
}

export default ButtonPontoDeClique;
