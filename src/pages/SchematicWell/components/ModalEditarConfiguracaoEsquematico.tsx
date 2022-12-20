import { useEffect, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
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
import { useUpdateSchematicConfigMutation } from 'features/schematicWell/service/schematicWellApi';
import { Well } from 'features/wells/interfaces';

import { RequiredField } from 'components/RequiredField/RequiredField';

interface FormValues {
  depth: number;
}

interface Props {
  well: Well;
}

function ModalEditarConfiguracaoEsquematico({ well }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateSchematicConfig] = useUpdateSchematicConfigMutation();
  const { maxDepth, minDepth } = useSelector(schematicWellState);

  const [formValues, setFormValues] = useState<FormValues>({
    depth: 0,
  } as FormValues);

  const handleCancel = () => {
    onClose();
  };

  const payload = {
    dataSource: process.env.REACT_APP_DATA_SOURCE_ID,
    database: process.env.REACT_APP_DATABASE,
    collection: 'schematic-well-config',
    filter: { 'well.id': well._id },
    update: { $set: { maxDepth: formValues.depth } },
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateSchematicConfig(payload);
    onClose();
  };

  const isButtonDisabled = () => {
    if (formValues.depth <= 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      depth: maxDepth,
    });
  }, [isOpen]);

  useEffect(() => {
    setFormValues({
      depth: 0,
    });
  }, [onClose]);

  return (
    <>
      <Button variant={'origemBlueOutline'} onClick={onOpen} w={'100%'} rightIcon={<AiOutlineSetting size={22} />}>
        Editar Profundidade Máxima
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDITAR CONFIGURAÇÃO ESQUEMÁTICO</ModalHeader>
          <ModalCloseButton color={'white'} onClick={handleCancel} />
          <ModalBody>
            <Flex direction={'column'} gap={4}>
              <FormControl>
                <Flex gap={1}>
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    POÇO
                  </Text>
                </Flex>
                <Input
                  variant={'origem'}
                  isRequired
                  placeholder="Poço"
                  id="Poço"
                  type="text"
                  name="Poço"
                  value={well.nome_poco}
                  isDisabled
                />
              </FormControl>
              <FormControl>
                <Flex gap={1}>
                  <RequiredField />
                  <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                    ÁREA MAIS PROFUNDA (METROS)
                  </Text>
                </Flex>
                <NumberInput
                  min={minDepth}
                  max={9999999999}
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

export default ModalEditarConfiguracaoEsquematico;
