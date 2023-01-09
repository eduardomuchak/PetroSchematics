import { useEffect, useState } from 'react';

import { Heading, Image, Stack, Text } from '@chakra-ui/react';
import SignedUpSVG from 'assets/signed-up.svg';
import { useGetUserInfoQuery } from 'features/api/services/user/userCRUD';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';

function AutenticacaoMicrosoft() {
  const tokenMicrosoft = sessionStorage.getItem('@Origem:microsoftToken');
  const [teste, setTeste] = useState([]);
  const getUserInfo = useGetUserInfoQuery({ code: tokenMicrosoft });

  useEffect(() => {
    if (getUserInfo?.data) {
      setTeste(getUserInfo.data);
    }
  }, [getUserInfo.data]);

  if (getUserInfo.isLoading || teste.length === 0) {
    return (
      <GridLayout>
        <Loading />
      </GridLayout>
    );
  }

  return (
    <GridLayout>
      <Stack textAlign={'center'} align={'center'} spacing={{ base: 8, md: 10 }} py={12}>
        <Stack>
          <Image src={SignedUpSVG} alt="Login realizado com sucesso" height={{ sm: '24rem', lg: '28rem' }} />
        </Stack>
        <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }} lineHeight={'110%'}>
          Bem vindo{' '}
          <Text as={'span'} color={'origem.500'} fontWeight={700}>
            Dan Abramov!
          </Text>
        </Heading>
        <Text as={'span'} color={'gray.500'} maxW={'3xl'}>
          <Text as={'span'} color={'origem.500'} fontWeight={700}>
            Origem Energia.{' '}
          </Text>
          Energia que se propaga e nos impulsiona para frente. Que move histórias e faz o mundo girar
        </Text>
      </Stack>
    </GridLayout>
  );
}

export default AutenticacaoMicrosoft;
