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

import { regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

interface FormValues {
  equipamentoDeSubsuperficie: string;
  odPolegada: string;
  idPolegada: string;
  fabricante: string;
  profundidadeMetros: number;
}

interface Props {
  equipment: SubsurfaceEquipment;
}

function ModalEditarEquipSubsuperficie({ equipment }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { maxDepth } = useSelector(schematicWellState);

  const [formValues, setFormValues] = useState<FormValues>({
    equipamentoDeSubsuperficie: '',
    odPolegada: '',
    idPolegada: '',
    fabricante: '',
    profundidadeMetros: 0,
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
      equipamentoDeSubsuperficie: equipment.subsurfaceEquipment,
      odPolegada: equipment.odInch,
      idPolegada: equipment.idInch,
      fabricante: equipment.manufacturer,
      profundidadeMetros: Number(equipment.depth.split(',')[0]),
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      equipamentoDeSubsuperficie: '',
      odPolegada: '',
      idPolegada: '',
      fabricante: '',
      profundidadeMetros: 0,
    });
  }, [onClose]);

  return (
    <>
      <IconButton onClick={onOpen} aria-label="Botão de Editar" icon={<MdModeEdit />} variant="origemEditOutline" />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDITAR EQUIPAMENTO DE SUBSUPERFÍCIE</ModalHeader>
          <ModalCloseButton color={'white'} onClick={handleCancel} />
          <ModalBody>
            <Flex direction={'column'} gap={4}>
              <FormControl>
                <Flex gap={1}>
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    EQUIPAMENTO DE SUBSUPERFÍCIE
                  </Text>
                </Flex>
                <Input
                  variant={'origem'}
                  isRequired
                  placeholder="Equipamento de Subsuperfície"
                  id="equipamentoDeSubsuperficie"
                  type="text"
                  name="equipamentoDeSubsuperficie"
                  value={regexRemoverCaracteresEspeciais(formValues.equipamentoDeSubsuperficie)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      equipamentoDeSubsuperficie: event.target.value,
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
                    id="odPolegada"
                    type="text"
                    name="odPolegada"
                    value={regexRemoverCaracteresEspeciais(formValues.odPolegada)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setFormValues({
                        ...formValues,
                        odPolegada: event.target.value,
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
                    id="idPolegada"
                    type="text"
                    name="idPolegada"
                    value={regexRemoverCaracteresEspeciais(formValues.idPolegada)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setFormValues({
                        ...formValues,
                        idPolegada: event.target.value,
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
                  id="fabricante"
                  type="text"
                  name="fabricante"
                  value={regexRemoverCaracteresEspeciais(formValues.fabricante)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      fabricante: event.target.value,
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
