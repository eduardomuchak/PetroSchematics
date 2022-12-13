import { BsSquare, BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { RxTriangleDown } from 'react-icons/rx';

import { Flex, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react';

function CheckButton() {
  return (
    <Popover>
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
          >
            <Text fontWeight={700} fontSize={13} letterSpacing={0.3} color={'#0048BB'}>
              Aprovar
            </Text>
            <BsCheckCircleFill color={'#00B53D'} size={22} />
          </Flex>
          <Flex cursor={'pointer'} w={'136px'} align={'center'} pt={3} pb={3} justify={'space-between'}>
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
