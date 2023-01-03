import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { schematicWellState } from 'features/schematicWell/schematicWellSlice';
import { Well } from 'features/wells/interfaces';

import ModalCadastroComentarios from './ModalCadastroComentarios';
import ModalCadastroEquipSubSuperficie from './ModalCadastroEquipSubSuperficie';
import ModalCadastroEquipSuperficie from './ModalCadastroEquipSuperficie';
import ModalEditarConfiguracaoEsquematico from './ModalEditarConfiguracaoEsquematico';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Props {
  modalProps: ModalProps;
}

function ModalDecisao({ modalProps }: Props) {
  const { isOpen, onClose } = modalProps;
  const { well } = useLocation().state as { well: Well };
  const { mousePosition } = useSelector(schematicWellState);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>O QUE VOCÊ GOSTARIA DE FAZER?</ModalHeader>
        <ModalCloseButton color={'white'} onClick={onClose} />
        <ModalBody mb={4}>
          <Flex direction={'column'} gap={4}>
            {mousePosition.isSurface ? (
              <>
                <ModalCadastroComentarios />
                <ModalCadastroEquipSuperficie />
              </>
            ) : (
              <>
                <ModalCadastroComentarios />
                <ModalCadastroEquipSubSuperficie />
                <ModalEditarConfiguracaoEsquematico well={well} />
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalDecisao;
