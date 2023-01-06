import { Flex, Heading, Text } from '@chakra-ui/react';

import BotaoSetaVoltar from '../BotaoSetaVoltar/BotaoSetaVoltar';

interface Props {
  children: string;
  botaoVoltar?: boolean;
  subTitulo?: string;
}

function TituloPagina({ children, botaoVoltar, subTitulo }: Props) {
  return (
    <Flex align={'start'} mb={4} direction={'column'}>
      <Flex align={'center'} gap={2}>
        {botaoVoltar && <BotaoSetaVoltar />}
        <Heading as="h2" size="md" fontFamily={'Mulish'} textAlign={'center'} fontSize={'24px'} fontWeight={'700'}>
          {children}
        </Heading>
      </Flex>
      {subTitulo && (
        <Text fontFamily={'Mulish'} textAlign={'start'} fontSize={'16px'} fontWeight={'600'} ml={12} mt={-1}>
          {subTitulo}
        </Text>
      )}
    </Flex>
  );
}

export default TituloPagina;
