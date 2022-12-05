import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Flex, FormControl, FormLabel, HStack, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Ring, Jelly } from '@uiball/loaders';
import logo from 'assets/logo.png';
import { useLoginMutation } from 'features/auth/authApiSlice';
import { setCredentials } from 'features/auth/authSlice';

import { useToast } from 'contexts/Toast';

const Login: any = () => {
  const { toast } = useToast();

  const [form, setForm] = useState({ email: '', senha: '' });
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const { email, senha } = form;
      const userData = await login({ email, senha }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setForm({ email: '', senha: '' });
      navigate('/style-guide');
    } catch (err) {
      toast.error('Usuário ou senha inválidos', {
        id: 'toast-principal',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      {isLoading ? (
        <Flex display={'flex'} align={'center'} justify={'center'} h={'100vh'}>
          <Jelly speed={0.9} color="blue" size={80} />
        </Flex>
      ) : (
        <Flex w={'100%'} h="100vh" align="center" justify="center" bg={'#EDF2F7'}>
          <Stack>
            <Box
              w={{ base: '200px', sm: '450px' }}
              py={{ base: '10', sm: '16' }}
              px={{ base: '10', sm: '10' }}
              bg={'white'}
              borderRadius={'xl'}
            >
              <Stack spacing="6">
                <Stack spacing={{ base: '2', md: '3' }} align="center">
                  <a href="https://www.origemenergia.com" target="_blank" rel="noreferrer">
                    <Image src={logo} display="flex" align="center" w={60} justifyContent="center" />
                  </a>
                  <HStack spacing="1" justify="center">
                    <Text color="gray.400" mt={8}>
                      Entre com seu e-mail e senha abaixo
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Stack spacing="6" mt={15}>
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        variant={'origem'}
                        isRequired
                        id="email"
                        type="email"
                        name="email"
                        value={form.email
                          .replace(/[\u0021-\u002d\u002f\u003a-\u003f\u005b-\u0060\u007b-\u00b6\u00b8-\u00ff]/g, '')
                          .toLowerCase()}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
                        maxLength={150}
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="senha" justifyContent="space-between" display="flex">
                        Senha
                        <Button variant="link" color="gray.400" size="sm" onClick={() => navigate('/esqueci-a-senha')}>
                          Esqueceu sua senha?
                        </Button>
                      </FormLabel>
                      <Input
                        variant={'origem'}
                        isRequired
                        id="senha"
                        type="password"
                        name="senha"
                        value={form.senha}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
                        maxLength={255}
                      />
                    </FormControl>
                  </Stack>
                  <Stack display={'flex'} spacing="6" align={'center'}>
                    <Button
                      mt={4}
                      w={'80%'}
                      type="submit"
                      background="origem.300"
                      variant={'origemBlueSolid'}
                      color="white"
                      _hover={{
                        background: 'origem.500',
                        transition: 'all 0.4s',
                      }}
                      onClick={handleSubmit}
                    >
                      {isLoading ? <Ring speed={2} lineWeight={5} color="white" size={24} /> : 'Entrar'}
                    </Button>
                  </Stack>
                </Stack>
              </form>
              <Stack spacing="10" marginTop={50} align="center">
                <Text color="gray.400">
                  Não tem conta?{' '}
                  <Button variant="link" color="origem.400" size="sm" onClick={() => navigate('/cadastre-se')}>
                    Cadastre-se
                  </Button>
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
    </>
  );
};
export default Login;
