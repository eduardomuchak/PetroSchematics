import { useEffect, useState } from 'react';

import { Heading, Image, Stack, Text } from '@chakra-ui/react';
import SignedUpSVG from 'assets/signed-up.svg';
import { useGetTesteQuery } from 'features/api/services/teste/microsoftTeste';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';

function AutenticacaoMicrosoft() {
  const [teste, setTeste] = useState([]);
  const getTeste = useGetTesteQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (getTeste?.data) {
      setTeste(getTeste.data);
    }
  }, [getTeste.data]);

  if (getTeste.isLoading || teste.length === 0) {
    return (
      <GridLayout>
        <Loading />
      </GridLayout>
    );
  }

  return (
    <GridLayout>
      {/* <Text>{JSON.stringify(teste)}</Text> */}
      {/* <Flex display={'flex'} align={'center'} justify={'center'} h={'77vh'} direction={'column'} p={5} gap={5}>
        <Image src={SignedUpSVG} alt="Login realizado com sucesso" w={{ base: '100%', sm: '40vw' }} maxW={'300px'} />
      </Flex> */}
      <Stack textAlign={'center'} align={'center'} spacing={{ base: 8, md: 10 }} py={12}>
        <Stack spacing={6} direction={'row'}>
          <Image
            src={SignedUpSVG}
            alt="Login realizado com sucesso"
            height={{ sm: '24rem', lg: '28rem' }}
            // mt={{ base: 12, sm: 16 }}
          />
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
