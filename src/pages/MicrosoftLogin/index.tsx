import { Box, Button, Flex, HStack, Image, Stack, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import wallpaper from 'assets/login-wallpaper.png';
import logo from 'assets/logo.png';

import { ReactComponent as MicrosoftLogo } from '../../assets/logo-microsoft.svg';

export default function LoginMicrosoft() {
  const API_URL = `${process.env.REACT_APP_URL_API_BACKEND}`;

  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={wallpaper}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        // bgGradient={'linear(140deg, #05337d 0%, #00368db9 25%, rgba(0,71,187,0.2530199579831933) 100%)'}
        backdropFilter={'blur(2px)'}
      >
        <Stack display={'flex'} align={'center'} justify={'center'}>
          <Box
            w={{ base: '95%', sm: '500px' }}
            minH={'277px'}
            py={{ base: '10', sm: '12' }}
            px={{ base: '10', sm: '10' }}
            bg={'rgba(255, 255, 255, 1)'}
            borderRadius={'xl'}
          >
            <Stack spacing="6">
              <Stack spacing={{ base: '2', md: '3' }} align="center">
                <a href="https://www.origemenergia.com" target="_blank" rel="noreferrer">
                  <Image src={logo} display="flex" align="center" w={'300px'} justifyContent="center" />
                </a>
                <HStack spacing="1" justify="center">
                  <Text
                    color="#394960"
                    mt={8}
                    fontSize={'16px'}
                    fontWeight={700}
                    lineHeight={'20.08px'}
                    textAlign={'center'}
                  >
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
                  window.location.href = `${API_URL}/login/azure`;
                }}
              >
                <Text fontWeight={400} fontSize={'18px'} lineHeight={'23px'} letterSpacing={'0.3px'} color={'#3C3B3B'}>
                  Entrar com Microsoft
                </Text>
              </Button>
            </Flex>
          </Box>
        </Stack>
      </VStack>
    </Flex>
  );
}
