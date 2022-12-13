import { BsCheckCircleFill, BsXCircleFill, BsFillEyeFill } from 'react-icons/bs';

import { Flex, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react';

function EyePopover() {
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
        <BsFillEyeFill />
      </PopoverTrigger>
    </Popover>
  );
}

export default EyePopover;
