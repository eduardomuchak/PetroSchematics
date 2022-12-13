import { Flex, Image } from '@chakra-ui/react';
import SchematicSVG from 'assets/esquematico.svg';

import Header from 'components/Header';

import CardConfiguracaoEsquematico from './components/CardConfiguracaoEsquematico';

function SchematicWellConfig() {
  return (
    <Header>
      <Flex gap={24} justify={'center'} p={12}>
        <Image alt={'Schematic'} src={SchematicSVG} h={1000} />
        <CardConfiguracaoEsquematico />
      </Flex>
    </Header>
  );
}

export default SchematicWellConfig;
