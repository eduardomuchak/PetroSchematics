import { useNavigate } from 'react-router-dom';

import { Box, Text, Button, Flex, Image } from '@chakra-ui/react';
import UnderDevelopmentSVG from 'assets/under-development.svg';

import styles from './style.module.scss';

export function UnderDevelopment() {
  const navigate = useNavigate();
  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      direction={'column'}
      className={`${styles['background-pattern']}`}
    >
      <Box textAlign="center" py={10} px={6} gap={12}>
        <Image src={UnderDevelopmentSVG} alt="Página não encontrada" height={{ sm: '24rem', lg: '28rem' }} />
      </Box>
      <Flex direction={'column'} align={'center'} px={10}>
        <Text fontSize="18px" mb={4} textAlign={'center'}>
          A página que você buscou ainda está em desenvolvimento
        </Text>
        <Button
          variant="origemBlueSolid"
          onClick={() => {
            navigate(-1);
          }}
        >
          Voltar
        </Button>
      </Flex>
    </Flex>
  );
}
