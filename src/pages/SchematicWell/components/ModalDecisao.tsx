import { useEffect, useState } from 'react';

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

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

function ModalDecisao({ modalProps, mousePosition }: Props) {
  const { isOpen, onClose } = modalProps;

  const [formValues, setFormValues] = useState<FormValues>({
    comentarios: '',
    profundidadeMetros: 0,
    xAxis: 0,
  });

  const handleCancel = () => {
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
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>O que você gostaria de fazer?</ModalHeader>
        <ModalCloseButton color={'white'} onClick={handleCancel} />
        <ModalBody mb={4}>
          <Flex direction={'column'} gap={4}>
            <Button variant={'origemBlueOutline'} onClick={handleCancel} w={'100%'}>
              Adicionar Comentário
            </Button>
            <Button variant={'origemBlueOutline'} onClick={handleCancel} w={'100%'}>
              Cadastrar Equipamento de Subsuperfície
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalDecisao;
