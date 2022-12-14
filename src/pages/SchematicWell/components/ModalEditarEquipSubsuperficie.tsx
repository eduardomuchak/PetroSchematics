import { useEffect, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';

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
import { SubsurfaceEquipment } from 'features/schematicWell/interfaces';
import { schematicWellState } from 'features/schematicWell/schematicWellSlice';
import { useUpdateSubsurfaceEquipmentMutation } from 'features/schematicWell/service/schematicWellApi';

import { RequiredField } from 'components/RequiredField/RequiredField';

import { regexApenasNumeroseBarra, regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

import { usePayload } from 'hooks/usePayload';

interface FormValues {
  subsurfaceEquipment: string;
  odInch: string;
  idInch: string;
  manufacturer: string;
  depth: number;
  _id: string;
  hash: string;
}

interface Props {
  equipment: SubsurfaceEquipment;
}

function ModalEditarEquipSubsuperficie({ equipment }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { maxDepth } = useSelector(schematicWellState);
  const [updateSubsurfaceEquipment] = useUpdateSubsurfaceEquipmentMutation();

  const [formValues, setFormValues] = useState<FormValues>({
    subsurfaceEquipment: '',
    odInch: '',
    idInch: '',
    manufacturer: '',
    depth: 0,
    _id: '',
    hash: '',
  });
  const handleCancel = () => {
    onClose();
  };

  const payload = usePayload('schematic-well-subsurface-equipments', 'UPDATE', formValues);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateSubsurfaceEquipment(payload);
    onClose();
  };

  const isButtonDisabled = () => {
    if (formValues.subsurfaceEquipment === '') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      subsurfaceEquipment: equipment.subsurfaceEquipment,
      odInch: equipment.odInch,
      idInch: equipment.idInch,
      manufacturer: equipment.manufacturer,
      depth: Number(equipment.depth),
      _id: equipment._id,
      hash: equipment.hash,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      subsurfaceEquipment: '',
      odInch: '',
      idInch: '',
      manufacturer: '',
      depth: 0,
      _id: '',
      hash: '',
    });
  }, [onClose]);

  return (
    <>
      <IconButton onClick={onOpen} aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditGhost" />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDITAR EQUIPAMENTO DE SUBSUPERFÍCIE</ModalHeader>
          <ModalCloseButton color={'white'} onClick={handleCancel} />
          <ModalBody>
            <Flex direction={'column'} gap={4}>
              <FormControl>
                <Flex gap={1}>
                  <RequiredField />
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    EQUIPAMENTO DE SUBSUPERFÍCIE
                  </Text>
                </Flex>
                <Input
                  variant={'origem'}
                  isRequired
                  placeholder="Equipamento de Subsuperfície"
                  id="subsurfaceEquipment"
                  type="text"
                  name="subsurfaceEquipment"
                  value={regexRemoverCaracteresEspeciais(formValues.subsurfaceEquipment)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      subsurfaceEquipment: event.target.value,
                    })
                  }
                  maxLength={50}
                />
              </FormControl>
              <Flex gap={2}>
                <FormControl>
                  <Flex gap={1}>
                    <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                      OD (INCH/POLEGADA)
                    </Text>
                  </Flex>
                  <Input
                    variant={'origem'}
                    isRequired
                    placeholder="OD (inch/polegada)"
                    id="odInch"
                    type="text"
                    name="odInch"
                    value={regexApenasNumeroseBarra(formValues.odInch)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setFormValues({
                        ...formValues,
                        odInch: event.target.value,
                      })
                    }
                    maxLength={10}
                  />
                </FormControl>
                <FormControl>
                  <Flex gap={1}>
                    <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                      ID (INCH/POLEGADA)
                    </Text>
                  </Flex>
                  <Input
                    variant={'origem'}
                    isRequired
                    placeholder="ID (inch/polegada)"
                    id="idInch"
                    type="text"
                    name="idInch"
                    value={regexApenasNumeroseBarra(formValues.idInch)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setFormValues({
                        ...formValues,
                        idInch: event.target.value,
                      })
                    }
                    maxLength={10}
                  />
                </FormControl>
              </Flex>
              <FormControl>
                <Flex gap={1}>
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    FABRICANTE
                  </Text>
                </Flex>
                <Input
                  variant={'origem'}
                  isRequired
                  placeholder="Fabricante"
                  id="manufacturer"
                  type="text"
                  name="manufacturer"
                  value={regexRemoverCaracteresEspeciais(formValues.manufacturer)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      manufacturer: event.target.value,
                    })
                  }
                  maxLength={50}
                />
              </FormControl>
              <FormControl>
                <Flex gap={1}>
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    PROFUNDIDADE (METROS)
                  </Text>
                </Flex>
                <NumberInput
                  min={0}
                  max={maxDepth}
                  value={formValues.depth}
                  onChange={(valueString) => {
                    setFormValues({
                      ...formValues,
                      depth: Number(valueString),
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

export default ModalEditarEquipSubsuperficie;
