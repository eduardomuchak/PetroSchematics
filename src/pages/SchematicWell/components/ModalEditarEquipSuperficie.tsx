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

import { RequiredField } from 'components/RequiredField/RequiredField';

import { regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

interface FormValues {
  equipamentoDeSuperficie: string;
  descricao: string;
}

interface Props {
  equipment: SurfaceEquipment;
}

function ModalEditarEquipSuperficie({ equipment }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formValues, setFormValues] = useState<FormValues>({
    equipamentoDeSuperficie: '',
    descricao: '',
  } as FormValues);

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // console.log('Payload', formValues);
    onClose();
  };

  const isButtonDisabled = () => {
    if (formValues.equipamentoDeSuperficie === '') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      equipamentoDeSuperficie: equipment.surfaceEquipment,
      descricao: equipment.description,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      equipamentoDeSuperficie: '',
      descricao: '',
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
                  id="equipamentoDeSuperficie"
                  type="text"
                  name="equipamentoDeSuperficie"
                  value={regexRemoverCaracteresEspeciais(formValues.equipamentoDeSuperficie) || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      equipamentoDeSuperficie: event.target.value,
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
                  id="descricao"
                  type="text"
                  name="descricao"
                  value={regexRemoverCaracteresEspeciais(formValues.descricao) || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      descricao: event.target.value,
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
