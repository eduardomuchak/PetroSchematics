import { useEffect, useState } from 'react';

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
} from '@chakra-ui/react';

import { RequiredField } from 'components/RequiredField/RequiredField';

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
  equipamentoDeSubsuperficie: string;
  odPolegada: string;
  idPolegada: string;
  fabricante: string;
  profundidadeMetros: number;
  xAxis: number;
}

function ModalCadastroEquipSubSuperficie({ modalProps, mousePosition }: Props) {
  const { isOpen, onClose } = modalProps;

  const [formValues, setFormValues] = useState<FormValues>({
    equipamentoDeSubsuperficie: '',
    odPolegada: '',
    idPolegada: '',
    fabricante: '',
    profundidadeMetros: 0,
    xAxis: 0,
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
      profundidadeMetros: mousePosition.yAxis,
      xAxis: mousePosition.xAxis,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      equipamentoDeSubsuperficie: '',
      odPolegada: '',
      idPolegada: '',
      fabricante: '',
      profundidadeMetros: 0,
      xAxis: 0,
    });
  }, [onClose]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Equipamento de Subsuperfície</ModalHeader>
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
                  id="equipamentoDeSubsuperficie"
                  type="text"
                  name="equipamentoDeSubsuperficie"
                  value={formValues.equipamentoDeSubsuperficie}
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
                    <RequiredField />
                    <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                      OD (INCH/POLEGADA)
                    </Text>
                  </Flex>
                  <Input
                    variant={'origem'}
                    isRequired
                    placeholder="OD(inch/polegada)"
                    id="odPolegada"
                    type="text"
                    name="odPolegada"
                    value={formValues.odPolegada}
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
                    <RequiredField />
                    <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                      ID (INCH/POLEGADA)
                    </Text>
                  </Flex>
                  <Input
                    variant={'origem'}
                    isRequired
                    placeholder="ID(inch/polegada)"
                    id="idPolegada"
                    type="text"
                    name="idPolegada"
                    value={formValues.idPolegada}
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
                  <RequiredField />
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
                  value={formValues.fabricante}
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
                  <RequiredField />
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    PROFUNDIDADE (METROS)
                  </Text>
                </Flex>
                <NumberInput
                  min={0}
                  max={999999999999999}
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
            {/* <Text>{`Clique Eixo Y: ${mousePosition.yAxis}`}</Text> */}
            {/* <Text>{`Clique Eixo X: ${mousePosition.xAxis}`}</Text> */}
          </ModalBody>
          <ModalFooter>
            <Flex gap={2}>
              <Button variant={'origemRedSolid'} onClick={handleCancel}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant={'origemBlueSolid'}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleSubmit(event)}
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

export default ModalCadastroEquipSubSuperficie;
