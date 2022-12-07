import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import ModalCadastroComentarios from './ModalCadastroComentarios';
import ModalCadastroEquipSubSuperficie from './ModalCadastroEquipSubSuperficie';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Props {
  modalProps: ModalProps;
}

function ModalDecisao({ modalProps }: Props) {
  const { isOpen, onClose } = modalProps;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>O que você gostaria de fazer?</ModalHeader>
        <ModalCloseButton color={'white'} onClick={onClose} />
        <ModalBody mb={4}>
          <Flex direction={'column'} gap={4}>
            <ModalCadastroComentarios />
            <ModalCadastroEquipSubSuperficie />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalDecisao;
