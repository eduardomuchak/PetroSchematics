import { useEffect, useState } from 'react';

import { Flex, Image, Text } from '@chakra-ui/react';

import localUserIcon from '../../assets/user-icon.svg';

interface Props {
  isHovering: boolean;
  onMouseEnter: () => void;
}

function UserInfo({ isHovering, onMouseEnter }: Props) {
  // PEGAR O VALOR DA ALTURA DA TELA PARA COLOCAR O BOTÃO NO FINAL DA TELA
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {}, [
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    }),
  ]);

  return (
    <Flex position={'fixed'} top={height - 118} zIndex={999} left={'1.4rem'} onMouseEnter={onMouseEnter}>
      <Flex h={'42px'} borderRadius={50} align={'center'} w={isHovering ? '100%' : 'auto'} flex={1}>
        <Image
          src={'https://bit.ly/dan-abramov'}
          alt="Logged user profile image"
          borderRadius="full"
          boxSize="40px"
          fallbackSrc={localUserIcon}
        />
        {isHovering && (
          <Flex direction={'column'} flex={1}>
            <Text ml={3} fontSize={16} fontWeight={700} lineHeight={'20px'} color={'origem.500'}>
              User
            </Text>
            <Text
              ml={3}
              fontSize={16}
              fontWeight={400}
              lineHeight={'20px'}
              color={'origem.500'}
              letterSpacing={'0.3px'}
            >
              dan.abramov@origem.com.br
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default UserInfo;
