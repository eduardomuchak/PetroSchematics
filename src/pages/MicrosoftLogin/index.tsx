import React from 'react';

import { Box, Button, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import logo from 'assets/logo.png';

import { ReactComponent as MicrosoftLogo } from '../../assets/logo-microsoft.svg';
import styles from './style.module.scss';

export default function LoginMicrosoft(props: any) {
  return (
    <>
      <Flex
        w={'100%'}
        h="100vh"
        align="center"
        justify="center"
        // bg={'#EDF2F7'}
        className={`${styles['background-pattern']}`}
      >
        <Stack display={'flex'} align={'center'} justify={'center'}>
          <Box
            w={{ base: '95%', sm: '450px' }}
            py={{ base: '10', sm: '16' }}
            px={{ base: '10', sm: '10' }}
            bg={'white'}
            borderRadius={'xl'}
          >
            <Stack spacing="6">
              <Stack spacing={{ base: '2', md: '3' }} align="center">
                <a href="https://www.origemenergia.com" target="_blank" rel="noreferrer">
                  <Image src={logo} display="flex" align="center" w={'275px'} justifyContent="center" />
                </a>
                <HStack spacing="1" justify="center">
                  <Text color="#394960" mt={8} fontSize={'16px'} fontWeight={700} lineHeight={'20.08px'}>
                    Entre com sua conta Microsoft Origem.
                  </Text>
                </HStack>
              </Stack>
            </Stack>
            <Flex align={'center'} justify={'center'} mt={8}>
              <Button
                w={'100%'}
                h={'56px'}
                leftIcon={<MicrosoftLogo />}
                px={'16px'}
                py={'8px'}
                backgroundColor={'#FEFEFE'}
                border={'1px solid #D6D4D4'}
                onClick={() => {
                  // Abrir em nova aba:
                  // window.open('http://localhost:8000/login/azure', '_blank');
                  window.location.href = 'http://localhost:8000/login/azure';
                }}
              >
                <Text fontWeight={400} fontSize={'18px'} lineHeight={'23px'} letterSpacing={'0.3px'} color={'#3C3B3B'}>
                  Entrar com Microsoft
                </Text>
              </Button>
            </Flex>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
