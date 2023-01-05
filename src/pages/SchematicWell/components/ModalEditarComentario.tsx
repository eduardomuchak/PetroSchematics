import { useEffect, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useUpdateCommentsMutation } from 'features/api/services/schematicWell/commentsCRUD';
import { Comment } from 'features/schematicWell/interfaces';
import { schematicWellState } from 'features/schematicWell/schematicWellSlice';
import { Well } from 'features/wells/interfaces';

import { RequiredField } from 'components/RequiredField/RequiredField';

import { regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

import { usePayload } from 'hooks/usePayload';

interface FormValues {
  yAxis: number;
  comments: string;
  _id: string;
  hash: string;
  xAxis: number;
  isSurface: boolean;
}

interface Props {
  comment: Comment;
}

function ModalEditarComentario({ comment }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateComments] = useUpdateCommentsMutation();
  const { maxDepth } = useSelector(schematicWellState);
  const { well: wellLocationState } = useLocation().state as { well: Well };

  const [formValues, setFormValues] = useState<FormValues>({
    yAxis: 0,
    comments: '',
    _id: '',
    hash: '',
    xAxis: 0,
    isSurface: false,
  } as FormValues);

  const handleCancel = () => {
    onClose();
  };

  const payload = usePayload('schematic-well-comments', 'UPDATE', {
    ...formValues,
    well: { id: wellLocationState._id, name: wellLocationState.nome_poco },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateComments(payload);
    onClose();
  };

  const isButtonDisabled = () => {
    if (formValues.comments === '') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      yAxis: comment.yAxis,
      comments: comment.comments,
      _id: comment._id,
      hash: comment.hash,
      xAxis: comment.xAxis,
      isSurface: comment.isSurface,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      yAxis: 0,
      comments: '',
      _id: '',
      hash: '',
      xAxis: 0,
      isSurface: false,
    });
  }, [onClose]);

  // console.log('formValues', formValues);

  return (
    <>
      <IconButton onClick={onOpen} aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditGhost" />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDITAR COMENTÁRIO</ModalHeader>
          <ModalCloseButton color={'white'} onClick={handleCancel} />
          <ModalBody>
            <Flex direction={'column'} gap={4}>
              {formValues.isSurface ? null : (
                <FormControl>
                  <Flex gap={1}>
                    <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                      PROFUNDIDADE (METROS)
                    </Text>
                  </Flex>
                  <NumberInput
                    min={0}
                    max={maxDepth}
                    value={formValues.yAxis}
                    onChange={(valueString) => {
                      setFormValues({
                        ...formValues,
                        yAxis: Number(valueString),
                      });
                    }}
                    allowMouseWheel
                    precision={2}
                    step={0.01}
                  >
                    <NumberInputField h={'56px'} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              )}

              <FormControl>
                <Flex gap={1}>
                  <RequiredField />
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    COMENTÁRIO
                  </Text>
                </Flex>
                <Input
                  variant={'origem'}
                  isRequired
                  placeholder="Comentário"
                  id="comments"
                  type="text"
                  name="comments"
                  value={regexRemoverCaracteresEspeciais(formValues.comments) || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      comments: event.target.value,
                    })
                  }
                  maxLength={50}
                />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex gap={2}>
              <Button variant={'origemRedGhost'} onClick={handleCancel}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant={'origemBlueSolid'}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleSubmit(event)}
                isDisabled={isButtonDisabled()}
              >
                Concluir
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditarComentario;
