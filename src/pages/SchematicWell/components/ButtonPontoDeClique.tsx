import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useDeleteCommentsMutation } from 'features/api/services/schematicWell/commentsCRUD';
import { Comment, SubsurfaceEquipment, SurfaceEquipment } from 'features/schematicWell/interfaces';
import { openPointOfClick } from 'features/schematicWell/schematicWellSlice';

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
  surfaceEquipment?: SurfaceEquipment;
  comment?: Comment;
  isSurface: boolean;
}

function ButtonPontoDeClique({ position, onOpen, subsurfaceEquipment, comment, surfaceEquipment, isSurface }: Props) {
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

  const ToDelete = (comment: Comment) => {
    const payload = usePayload('schematic-well-comments', 'DELETE', comment);
    deleteComments(payload);
  };

  const SubSurfaceEquipamentCard = () => (
    <Box
      zIndex={999}
      position={'absolute'}
      w={'720px'}
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

        <Text
          fontWeight={500}
          fontSize={'16px'}
          wordBreak={'break-all'}
          maxH={'200px'}
          overflowY={'scroll'}
          overflowX={'hidden'}
        >
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

        <Text
          fontWeight={500}
          fontSize={'16px'}
          wordBreak={'break-all'}
          maxH={'200px'}
          overflowY={'scroll'}
          overflowX={'hidden'}
        >
          {subsurfaceEquipment?.manufacturer}
        </Text>
      </Flex>
    </Box>
  );

  const CommentCard = () => (
    <Box
      zIndex={999}
      position={'absolute'}
      width={'536px'}
      top={-20}
      left={8}
      backgroundColor={'#FEFEFE'}
      boxShadow={'0 0 4px rgba(0, 0, 0, 0.25)'}
      borderRadius={'4px'}
      p={5}
    >
      {isSurface ? (
        <>
          <Flex gap={1} direction={'column'}>
            {comment && (
              <Flex justify={'space-between'}>
                <Text fontWeight={700} fontSize={'16px'}>
                  Comentário:
                </Text>
                <Flex gap={2}>
                  <ModalEditarComentario comment={comment} />
                  <ModalDeletar equipment={comment} toDelete={ToDelete} />
                </Flex>
              </Flex>
            )}

            <Text
              fontWeight={500}
              fontSize={'16px'}
              wordBreak={'break-all'}
              maxH={'200px'}
              overflowY={'scroll'}
              overflowX={'hidden'}
            >
              {comment?.comments}
            </Text>
          </Flex>
        </>
      ) : (
        <>
          <Flex mb={3} justify={'space-between'} align={'center'}>
            <Flex gap={1}>
              <Text fontWeight={700} fontSize={'16px'}>
                Profundidade
              </Text>
              <Flex>
                <Text fontWeight={700} fontSize={'16px'}>
                  {comment?.yAxis}
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

            <Text
              fontWeight={500}
              fontSize={'16px'}
              wordBreak={'break-all'}
              maxH={'200px'}
              overflowY={'scroll'}
              overflowX={'hidden'}
            >
              {comment?.comments}
            </Text>
          </Flex>
        </>
      )}
    </Box>
  );

  const SurfaceEquipamentCard = () => (
    <Box
      zIndex={999}
      position={'absolute'}
      w={'720px'}
      top={-12}
      left={8}
      backgroundColor={'#FEFEFE'}
      boxShadow={'0 0 4px rgba(0, 0, 0, 0.25)'}
      borderRadius={'4px'}
      p={5}
    >
      <Flex gap={1}>
        <Text fontWeight={700} fontSize={'16px'}>
          Equipamento de Superfície:
        </Text>

        <Text
          fontWeight={500}
          fontSize={'16px'}
          wordBreak={'break-all'}
          maxH={'200px'}
          overflowY={'scroll'}
          overflowX={'hidden'}
        >
          {surfaceEquipment?.surfaceEquipment}
        </Text>
      </Flex>
    </Box>
  );

  if (isSurface === true) {
    return (
      <Flex
        position={'absolute'}
        left={xAxis - 12}
        bottom={scaleYAxis - 12}
        height={'24px'}
        width={'35px'}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Box
          as="button"
          height={'18px'}
          width={'18px'}
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
            dispacth(openPointOfClick({ isSurface: true, xAxis, yAxis }));
            onOpen();
          }}
        />
        {isHovering && comment && <CommentCard />}
        {isHovering && surfaceEquipment && <SurfaceEquipamentCard />}
      </Flex>
    );
  } else {
    return (
      <Flex
        position={'absolute'}
        left={xAxis - 12}
        top={scaleYAxis - 12}
        height={'24px'}
        width={'35px'}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Box
          as="button"
          height={'18px'}
          width={'18px'}
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
            dispacth(openPointOfClick({ isSurface: false, xAxis, yAxis }));
            onOpen();
          }}
        />
        {isHovering && subsurfaceEquipment && <SubSurfaceEquipamentCard />}
        {isHovering && comment && <CommentCard />}
      </Flex>
    );
  }
}

export default ButtonPontoDeClique;
