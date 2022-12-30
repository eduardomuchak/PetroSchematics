import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Text } from '@chakra-ui/react';

interface Props {
  isHovering: boolean;
}
function LogoutButton({ isHovering }: Props) {
  const navigate = useNavigate();

  function logOut() {
    sessionStorage.removeItem('@Origem:microsoftToken');
    navigate('/');
  }

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
    <Flex position={'fixed'} top={height - 70}>
      <Button
        variant={'origemBlueGhost'}
        width={isHovering ? '240px' : '48px'}
        transition={'all 0.4s'}
        onClick={logOut}
      >
        <Flex align={'center'} w={isHovering ? '100%' : 'auto'} flex={1}>
          <Text fontSize={24}>
            <FiLogOut />
          </Text>
          {isHovering && (
            <Text fontSize={18} ml={4}>
              Logout
            </Text>
          )}
        </Flex>
      </Button>
    </Flex>
  );
}

export default LogoutButton;
