import { useState } from 'react';
import { BsSquare, BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { RxTriangleDown } from 'react-icons/rx';

import {
  Flex,
  Button,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';

function CheckButton({ handle }: any) {
  const [openAprove, setOpenAprove] = useState(false);
  const [openReprove, setOpenReprove] = useState(false);

  return (
    <Popover>
      <Modal isOpen={openAprove} onClose={() => setOpenAprove(false)} size="lg">
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
                    os formulários selecionados? Essa ação não pode ser desfeita.
                  </Text>
                </Flex>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            <Flex gap={2}>
              <Button
                variant="ghost"
                color="#F40606"
                onClick={() => setOpenAprove(false)}
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
                onClick={() => [handle(true), setOpenAprove(false)]}
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
      <Modal isOpen={openReprove} onClose={() => setOpenReprove(false)} size="lg">
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
            <Flex direction={'column'} gap={4}>
              <Stack gap={2}>
                <Flex flexWrap="wrap">
                  <Text fontSize={'20px'} color={'#010101'} fontWeight={'400'}>
                    Você tem certeza que deseja
                  </Text>
                  <Text ml={'5px'} mr={'5px'} fontSize={'20px'} color={'#F40606'} fontWeight={'400'}>
                    REPROVAR
                  </Text>
                  <Text fontSize={'20px'} mb={'1px'} color={'#010101'} fontWeight={'400'}>
                    os formulários selecionados? Essa ação não pode ser desfeita.
                  </Text>
                </Flex>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            <Flex gap={2}>
              <Button
                variant="ghost"
                color="#F40606"
                onClick={() => setOpenReprove(false)}
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
                onClick={() => [handle(false), setOpenReprove(false)]}
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
      <PopoverContent w={'fit-content'}>
        <PopoverBody w={'fit-content'}>
          <Flex
            cursor={'pointer'}
            w={'136px'}
            align={'center'}
            pt={3}
            pb={3}
            justify={'space-between'}
            borderBottomColor={'#D9D9D9'}
            borderBottomWidth={'1px'}
            onClick={() => setOpenAprove(true)}
          >
            <Text fontWeight={700} fontSize={13} letterSpacing={0.3} color={'#0048BB'}>
              Aprovar
            </Text>
            <BsCheckCircleFill color={'#00B53D'} size={22} />
          </Flex>
          <Flex
            onClick={() => setOpenReprove(true)}
            cursor={'pointer'}
            w={'136px'}
            align={'center'}
            pt={3}
            pb={3}
            justify={'space-between'}
          >
            <Text fontWeight={700} fontSize={13} letterSpacing={0.3} color={'#0048BB'}>
              Recusar
            </Text>
            <BsXCircleFill color={'#F40606'} size={22} />
          </Flex>
        </PopoverBody>
      </PopoverContent>
      <PopoverTrigger>
        <Flex cursor={'pointer'} justify={'center'}>
          <BsSquare color={'#fff'} size={22} style={{ marginLeft: 23 }} />
          <RxTriangleDown color={'#fff'} size={22} />
        </Flex>
      </PopoverTrigger>
    </Popover>
  );
}

export default CheckButton;
