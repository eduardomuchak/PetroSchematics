import { useEffect, useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useAddCommentsMutation } from 'features/api/services/schematicWell/commentsCRUD';
import { schematicWellState } from 'features/schematicWell/schematicWellSlice';
import { Well } from 'features/wells/interfaces';

import { RequiredField } from 'components/RequiredField/RequiredField';

import { regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

import { usePayload } from 'hooks/usePayload';

interface FormValues {
  yAxis: number;
  xAxis: number;
  comments: string;
  isSurface: boolean;
}

function ModalCadastroComentarios() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { well: wellLocationState } = useLocation().state as { well: Well };

  const { mousePosition, maxDepth, maxHeight } = useSelector(schematicWellState);
  const [addComments] = useAddCommentsMutation();

  const [formValues, setFormValues] = useState<FormValues>({
    comments: '',
    yAxis: 0,
    xAxis: 0,
    isSurface: false,
  });

  const handleCancel = () => {
    onClose();
  };

  const payload = usePayload('schematic-well-comments', 'ADD', {
    ...formValues,
    well: { id: wellLocationState._id, name: wellLocationState.nome_poco },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addComments(payload);
    onClose();
  };

  const isButtonDisabled = () => {
    if (formValues.comments === '' || formValues.yAxis === 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      yAxis: mousePosition.yAxis,
      xAxis: mousePosition.xAxis,
      isSurface: mousePosition.isSurface,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      comments: '',
      yAxis: 0,
      xAxis: 0,
      isSurface: false,
    });
  }, [onClose]);

  return (
    <>
      <Button variant={'origemBlueOutline'} onClick={onOpen} w={'100%'} rightIcon={<BiComment size={22} />}>
        Adicionar Comentário
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADICIONAR COMENTÁRIOS</ModalHeader>
          <ModalCloseButton color={'white'} onClick={handleCancel} />
          <ModalBody>
            <Flex direction={'column'} gap={4}>
              {formValues.isSurface ? null : (
                <>
                  <FormControl>
                    <Flex gap={1}>
                      <RequiredField />
                      <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                        PROFUNDIDADE (METROS)
                      </Text>
                    </Flex>
                    <NumberInput
                      min={0}
                      max={formValues.isSurface ? maxHeight : maxDepth}
                      value={formValues.yAxis || 0}
                      onChange={(valueString) => {
                        setFormValues({ ...formValues, yAxis: Number(valueString) });
                      }}
                      variant={'origem'}
                      allowMouseWheel
                      precision={2}
                      step={0.01}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </>
              )}
              <FormControl>
                <Flex gap={1}>
                  <RequiredField />
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    COMENTÁRIOS
                  </Text>
                </Flex>
                <Textarea
                  placeholder={'Digite aqui os comentários'}
                  id={'comments'}
                  name={'comments'}
                  value={regexRemoverCaracteresEspeciais(formValues.comments)}
                  maxLength={5000}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormValues({ ...formValues, comments: event.target.value })
                  }
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
                Adicionar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastroComentarios;
