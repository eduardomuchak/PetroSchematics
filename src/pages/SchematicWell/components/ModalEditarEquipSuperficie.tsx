import { useEffect, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';

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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { SurfaceEquipment } from 'features/schematicWell/interfaces';
import { useUpdateSurfaceEquipmentMutation } from 'features/schematicWell/service/surfaceEquimentsCRUD';

import { RequiredField } from 'components/RequiredField/RequiredField';

import { regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

import { usePayload } from 'hooks/usePayload';

interface FormValues {
  surfaceEquipment: string;
  description: string;
  _id: string;
  hash: string;
}

interface Props {
  equipment: SurfaceEquipment;
}

function ModalEditarEquipSuperficie({ equipment }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateSurfaceEquipment] = useUpdateSurfaceEquipmentMutation();

  const [formValues, setFormValues] = useState<FormValues>({
    surfaceEquipment: '',
    description: '',
    _id: '',
    hash: '',
  } as FormValues);

  const handleCancel = () => {
    onClose();
  };

  const payload = usePayload('schematic-well-surface-equipments', 'UPDATE', formValues);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateSurfaceEquipment(payload);
    onClose();
  };

  const isButtonDisabled = () => {
    if (formValues.surfaceEquipment === '') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      surfaceEquipment: equipment.surfaceEquipment,
      description: equipment.description,
      _id: equipment._id,
      hash: equipment.hash,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      surfaceEquipment: '',
      description: '',
      _id: '',
      hash: '',
    });
  }, [onClose]);

  return (
    <>
      <IconButton onClick={onOpen} aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditOutline" />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDITAR EQUIPAMENTO DE SUPERFÍCIE</ModalHeader>
          <ModalCloseButton color={'white'} onClick={handleCancel} />
          <ModalBody>
            <Flex direction={'column'} gap={4}>
              <FormControl>
                <Flex gap={1}>
                  <RequiredField />
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    EQUIPAMENTO DE SUPERFÍCIE
                  </Text>
                </Flex>
                <Input
                  variant={'origem'}
                  isRequired
                  placeholder="Equipamento de Superfície"
                  id="surfaceEquipment"
                  type="text"
                  name="surfaceEquipment"
                  value={regexRemoverCaracteresEspeciais(formValues.surfaceEquipment) || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      surfaceEquipment: event.target.value,
                    })
                  }
                  maxLength={50}
                />
              </FormControl>

              <FormControl>
                <Flex gap={1}>
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    DESCRIÇÃO
                  </Text>
                </Flex>
                <Input
                  variant={'origem'}
                  isRequired
                  placeholder="Descrição"
                  id="description"
                  type="text"
                  name="description"
                  value={regexRemoverCaracteresEspeciais(formValues.description) || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      description: event.target.value,
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

export default ModalEditarEquipSuperficie;
