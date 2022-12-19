import { useLocation } from 'react-router-dom';

import { Flex, Image } from '@chakra-ui/react';
import SchematicSVG from 'assets/esquematico.svg';
import { Well } from 'features/wells/interfaces';

import GridLayout from 'components/Grid';

import CardConfiguracaoEsquematico from './components/CardConfiguracaoEsquematico';

function SchematicWellConfig() {
  const { well } = useLocation().state as { well: Well };

  // console.log('state', well);
  return (
    <GridLayout title={well.nome_poco}>
      <Flex gap={24} justify={'center'} p={12}>
        <Image alt={'Schematic'} src={SchematicSVG} h={1000} />
        <CardConfiguracaoEsquematico />
      </Flex>
    </GridLayout>
  );
}

export default SchematicWellConfig;
