import { Flex, Heading, Text } from '@chakra-ui/react';
import { Ripples } from '@uiball/loaders';

function RequestError() {
  return (
    <Flex display={'flex'} align={'center'} justify={'center'} h={'90vh'} direction={'column'} p={10} gap={5}>
      <Ripples size={90} speed={2.5} color="red" />
      <Heading textAlign={'center'}>Opa! Parece que houve um erro ao buscar os dados</Heading>
      <Text textAlign={'center'}>Tente novamente</Text>
    </Flex>
  );
}

export default RequestError;
