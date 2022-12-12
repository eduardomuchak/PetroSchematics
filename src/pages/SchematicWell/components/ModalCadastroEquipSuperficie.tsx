import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Button,
  Flex,
  FormControl,
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
import { schematicWellState } from 'features/schematicWell/schematicWellSlice';
import { useAddSurfaceEquipmentMutation } from 'features/schematicWell/service/surfaceEquimentsCRUD';

import { RequiredField } from 'components/RequiredField/RequiredField';

import { regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

import { usePayload } from 'hooks/usePayload';

interface FormValues {
  surfaceEquipment: string;
  description: string;
  depth: number;
  xAxis: number;
}

function ModalCadastroEquipSuperficie() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mousePosition, maxDepth } = useSelector(schematicWellState);
  const [addSurfaceEquipment] = useAddSurfaceEquipmentMutation();

  const [formValues, setFormValues] = useState<FormValues>({
    surfaceEquipment: '',
    description: '',
  } as FormValues);

  const handleCancel = () => {
    onClose();
  };

  const payload = usePayload('schematic-well-surface-equipments', 'ADD', formValues);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addSurfaceEquipment(payload);
    onClose();
  };

  const isButtonDisabled = () => {
    if (formValues.surfaceEquipment === '' || formValues.description === '' || formValues.depth === 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      depth: mousePosition.yAxis,
      xAxis: mousePosition.xAxis,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      surfaceEquipment: '',
      description: '',
      depth: 0,
      xAxis: 0,
    });
  }, [onClose]);

  return (
    <>
      <Button variant={'origemBlueOutline'} onClick={onOpen} w={'100%'}>
        Cadastrar Equipamento de Superfície
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CADASTRAR EQUIPAMENTO DE SUPERFÍCIE</ModalHeader>
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
                  value={regexRemoverCaracteresEspeciais(formValues.surfaceEquipment)}
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
                  <RequiredField />
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
                  value={regexRemoverCaracteresEspeciais(formValues.description)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormValues({
                      ...formValues,
                      description: event.target.value,
                    })
                  }
                  maxLength={50}
                />
              </FormControl>

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
                Cadastrar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCadastroEquipSuperficie;
