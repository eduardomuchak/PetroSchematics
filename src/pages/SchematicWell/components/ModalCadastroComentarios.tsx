import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
import { schematicWellState } from 'features/schematicWell/schematicWellSlice';

import { RequiredField } from 'components/RequiredField/RequiredField';

import { regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

interface FormValues {
  profundidadeMetros: number;
  xAxis: number;
  comentarios: string;
}

function ModalCadastroComentarios() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mousePosition, maxDepth } = useSelector(schematicWellState);

  const [formValues, setFormValues] = useState<FormValues>({
    comentarios: '',
    profundidadeMetros: 0,
    xAxis: 0,
  });

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // console.log('Payload', formValues);
    onClose();
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      profundidadeMetros: mousePosition.yAxis,
      xAxis: mousePosition.xAxis,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      comentarios: '',
      profundidadeMetros: 0,
      xAxis: 0,
    });
  }, [onClose]);

  return (
    <>
      <Button variant={'origemBlueOutline'} onClick={onOpen} w={'100%'}>
        Adicionar Comentário
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADICIONAR COMENTÁRIOS</ModalHeader>
          <ModalCloseButton color={'white'} onClick={handleCancel} />
          <ModalBody>
            <Flex direction={'column'} gap={4}>
              <FormControl>
                <Flex gap={1}>
                  <RequiredField />
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    PROFUNDIDADE (METROS)
                  </Text>
                </Flex>
                <NumberInput
                  min={0}
                  max={maxDepth}
                  value={formValues.profundidadeMetros}
                  onChange={(valueString) => {
                    setFormValues({
                      ...formValues,
                      profundidadeMetros: Number(valueString),
                    });
                  }}
                >
                  <NumberInputField h={'56px'} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <Flex gap={1}>
                  <RequiredField />
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    COMENTÁRIOS
                  </Text>
                </Flex>
                <Textarea
                  placeholder={'Digite aqui os comentários'}
                  id={'comentarios'}
                  name={'comentarios'}
                  value={regexRemoverCaracteresEspeciais(formValues.comentarios)}
                  maxLength={5000}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormValues({ ...formValues, comentarios: event.target.value })
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
