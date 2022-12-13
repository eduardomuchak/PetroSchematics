import { useNavigate } from 'react-router-dom';

import { Box, Text, Button, Flex, Image } from '@chakra-ui/react';
import NotFoundSVG from 'assets/not-found.svg';

import styles from './style.module.scss';

export function NotFound() {
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
        <Image src={NotFoundSVG} alt="Página não encontrada" w={{ base: '100%', sm: '40vw' }} maxW={'300px'} />
      </Box>
      <Flex direction={'column'} align={'center'} px={10}>
        <Text fontSize="18px" mb={4} textAlign={'center'}>
          Opa! Parece que a página que você buscou não foi encontrada
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
