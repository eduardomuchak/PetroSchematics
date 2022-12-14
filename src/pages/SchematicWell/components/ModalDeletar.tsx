import { FiTrash } from 'react-icons/fi';

import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Comment, SubsurfaceEquipment, SurfaceEquipment } from 'features/schematicWell/interfaces';

interface Props {
  equipment: SurfaceEquipment | SubsurfaceEquipment | Comment;
  toDelete: Function;
}

function ModalDeletar({ equipment, toDelete }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    toDelete(equipment);
    onClose();
  };

  return (
    <>
      <IconButton onClick={onOpen} aria-label="Botão de Lixeira" icon={<FiTrash />} variant="origemDeleteGhost" />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EXCLUIR</ModalHeader>
          <ModalCloseButton color={'white'} onClick={handleCancel} />
          <ModalBody>
            <Flex py={5} px={2}>
              <Text fontSize={'20px'} color={'#010101'} fontWeight={'500'}>
                Tem certeza que deseja mover este item para a Lixeira?
              </Text>
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
                Confirmar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDeletar;
