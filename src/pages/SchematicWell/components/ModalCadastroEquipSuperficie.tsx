import { useEffect, useState } from 'react';
import { FiTool } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useAddSurfaceEquipmentMutation } from 'features/api/services/schematicWell/surfaceEquipmentsCRUD';
import { schematicWellState } from 'features/schematicWell/schematicWellSlice';
import { Well } from 'features/wells/interfaces';

import { RequiredField } from 'components/RequiredField/RequiredField';

import { regexEquipamentosPocos, regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

import { usePayload } from 'hooks/usePayload';

interface FormValues {
  surfaceEquipment: string;
  description: string;
  height: number;
  xAxis: number;
}

function ModalCadastroEquipSuperficie() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { well: wellLocationState } = useLocation().state as { well: Well };
  const { mousePosition } = useSelector(schematicWellState);

  const [addSurfaceEquipment] = useAddSurfaceEquipmentMutation();

  const [formValues, setFormValues] = useState<FormValues>({
    surfaceEquipment: '',
    description: '',
    height: 0,
    xAxis: 0,
  } as FormValues);

  const handleCancel = () => {
    onClose();
  };

  const payload = usePayload('schematic-well-surface-equipments', 'ADD', {
    ...formValues,
    well: { id: wellLocationState._id, name: wellLocationState.nome_poco },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addSurfaceEquipment(payload);
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
      height: mousePosition.yAxis,
      xAxis: mousePosition.xAxis,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      surfaceEquipment: '',
      description: '',
      height: 0,
      xAxis: 0,
    });
  }, [onClose]);

  return (
    <>
      <Button variant={'origemBlueOutline'} onClick={onOpen} w={'100%'} rightIcon={<FiTool size={22} />}>
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
                  value={regexEquipamentosPocos(formValues.surfaceEquipment)}
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
              {/* <FormControl>
                <Flex gap={1}>
                  <RequiredField />
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    ALTURA (METROS)
                  </Text>
                </Flex>
                <NumberInput
                  min={0}
                  max={100}
                  value={formValues.height}
                  onChange={(valueString) => {
                    setFormValues({
                      ...formValues,
                      height: Number(valueString),
                    });
                  }}
                  variant={'origem'}
                  allowMouseWheel
                  precision={2}
                  step={0.01}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl> */}
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
