import { Flex, Image } from '@chakra-ui/react';
import SchematicSVG from 'assets/esquematico.svg';

import GridLayout from 'components/Grid';

import CardConfiguracaoEsquematico from './components/CardConfiguracaoEsquematico';

function SchematicWellConfig() {
  return (
    <GridLayout>
      <Flex gap={24} justify={'center'} p={12}>
        <Image alt={'Schematic'} src={SchematicSVG} h={1000} />
        <CardConfiguracaoEsquematico />
      </Flex>
    </GridLayout>
  );
}

export default SchematicWellConfig;
