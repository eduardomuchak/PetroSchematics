import { BsChevronLeft } from 'react-icons/bs';

import {
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';

function ModalPrevious() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <BsChevronLeft cursor={'pointer'} onClick={onOpen} size={48} color={'#0048BB'} style={{ marginTop: '200px' }} />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={'white'} />
          <ModalHeader
            backgroundColor={'#2E69FD'}
            borderTopRadius={7}
            display={'flex'}
            justifyContent={'center'}
            color={'white'}
            fontSize={'14px'}
            fontWeight={'700'}
            height={'48px'}
          >
            Próximo
          </ModalHeader>

          <ModalCloseButton color={'white'} />
          <ModalBody mt={3}>
            <FormControl>
              <Flex direction={'column'} gap={4}>
                <Stack gap={2}>
                  <Flex>
                    <Text fontSize={'20px'} mb={'1px'} color={'#010101'} fontWeight={'400'}>
                      Você tem certeza que deseja ir para o formulário anterior sem aprovar o atual?
                    </Text>
                  </Flex>
                </Stack>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            <Flex gap={2}>
              <Button
                variant="ghost"
                color="#F40606"
                onClick={() => onClose()}
                _hover={{
                  background: 'red.600',
                  transition: 'all 0.4s',
                  color: 'white',
                }}
                height={'56px'}
                width={'206px'}
                fontSize={'18px'}
                fontWeight={'700'}
              >
                Cancelar
              </Button>
              <Button
                background="origem.500"
                variant="primary"
                color="white"
                onClick={() => []}
                _hover={{
                  background: 'origem.600',
                  transition: 'all 0.4s',
                }}
                height={'56px'}
                width={'206px'}
                fontSize={'18px'}
                fontWeight={'700'}
              >
                <>
                  <Text>Confirmar</Text>
                </>
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPrevious;
