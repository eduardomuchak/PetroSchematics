import { useEffect, useState } from 'react';

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
} from '@chakra-ui/react';

import { RequiredField } from 'components/RequiredField/RequiredField';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MousePosition {
  yAxis: number;
  xAxis: number;
}

interface Props {
  modalProps: ModalProps;
  mousePosition: MousePosition;
}

interface FormValues {
  profundidadeMetros: number;
  xAxis: number;
  comentarios: string;
}

function ModalCadastroComentarios({ modalProps, mousePosition }: Props) {
  const { isOpen, onClose } = modalProps;

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
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Comentários</ModalHeader>
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
                  max={999999999999999}
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
                  value={formValues.comentarios}
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
              <Button variant={'origemRedSolid'} onClick={handleCancel}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant={'origemBlueSolid'}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleSubmit(event)}
              >
                Cadastrar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastroComentarios;
