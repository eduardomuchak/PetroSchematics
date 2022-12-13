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

function ModalAprove() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        background="origem.500"
        variant="primary"
        color="white"
        onClick={onOpen}
        _hover={{
          background: 'origem.600',
          transition: 'all 0.4s',
        }}
        height={'56px'}
        width={'206px'}
        fontSize={'18px'}
        fontWeight={'700'}
        borderRadius={'8px'}
      >
        <>
          <Text>Confirmar</Text>
        </>
      </Button>
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
            Aprovar
          </ModalHeader>

          <ModalCloseButton color={'white'} />
          <ModalBody mt={3}>
            <FormControl>
              <Flex direction={'column'} gap={4}>
                <Stack gap={2}>
                  <Flex flexWrap="wrap">
                    <Text fontSize={'20px'} color={'#010101'} fontWeight={'400'}>
                      Você tem certeza que deseja
                    </Text>
                    <Text ml={'5px'} mr={'5px'} fontSize={'20px'} color={'#00B53D'} fontWeight={'400'}>
                      APROVAR
                    </Text>
                    <Text fontSize={'20px'} mb={'1px'} color={'#010101'} fontWeight={'400'}>
                      esse formulário? Essa ação não pode ser desfeita.
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

export default ModalAprove;
