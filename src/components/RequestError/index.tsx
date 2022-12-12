import { useNavigate } from 'react-router';

import { Button, Flex, Heading, Image } from '@chakra-ui/react';
import NotFoundSVG from 'assets/not-found.svg';

function RequestError() {
  const navigate = useNavigate();

  return (
    <Flex display={'flex'} align={'center'} justify={'center'} h={'77vh'} direction={'column'} p={5} gap={5}>
      <Image src={NotFoundSVG} alt="Página não encontrada" w={{ base: '100%', sm: '40vw' }} maxW={'300px'} />
      <Heading textAlign={'center'} size={'md'}>
        Opa! Parece que houve um erro ao buscar os dados
      </Heading>
      <Button
        mt={4}
        type="submit"
        background="origem.300"
        variant={'origemBlueSolid'}
        color="white"
        _hover={{
          background: 'origem.500',
          transition: 'all 0.4s',
        }}
        onClick={() => {
          navigate(0);
        }}
      >
        Tentar novamente
      </Button>
    </Flex>
  );
}

export default RequestError;
