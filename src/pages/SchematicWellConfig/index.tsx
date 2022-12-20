import { useLocation, useNavigate } from 'react-router-dom';

import { Flex, Image } from '@chakra-ui/react';
import SchematicSVG from 'assets/esquematico.svg';
import { useGetSchematicConfigQuery } from 'features/schematicWell/service/schematicWellApi';
import { Well } from 'features/wells/interfaces';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';
import RequestError from 'components/RequestError';

import { usePayload } from 'hooks/usePayload';

import CardConfiguracaoEsquematico from './components/CardConfiguracaoEsquematico';

function SchematicWellConfig() {
  const { well } = useLocation().state as { well: Well };
  const navigate = useNavigate();

  const payloadConfig = usePayload('schematic-well-config', 'GETBYFILTER', {}, { 'well.id': well._id });
  const { isLoading, data, error } = useGetSchematicConfigQuery(payloadConfig);

  if (isLoading) {
    return (
      <GridLayout>
        <Loading />
      </GridLayout>
    );
  }

  if (error) {
    return (
      <GridLayout>
        <RequestError />
      </GridLayout>
    );
  }

  // Verifica se o esquemático já foi configurado
  // Se sim, redireciona para a página de visualização do esquemático
  if (data?.document?.maxDepth) {
    navigate(`/esquematico-well/${well._id}`, { state: { well } });
  }

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
