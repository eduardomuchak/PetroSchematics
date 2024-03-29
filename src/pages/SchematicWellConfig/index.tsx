import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Flex, Image } from '@chakra-ui/react';
import SchematicSVG from 'assets/esquematico.svg';
import { useGetSchematicConfigQuery } from 'features/api/services/schematicWell/schematicConfigCRUD';
import { Well } from 'features/wells/interfaces';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';
import RequestError from 'components/RequestError';

import { useToast } from 'contexts/Toast';

import { usePayload } from 'hooks/usePayload';

import CardConfiguracaoEsquematico from './components/CardConfiguracaoEsquematico';

function SchematicWellConfig() {
  const { well } = useLocation().state as { well: Well };
  const navigate = useNavigate();
  const { toast } = useToast();

  const payloadConfig = usePayload('schematic-well-config', 'GETBYFILTER', {}, { 'well.id': well._id });
  const { isLoading, data, error } = useGetSchematicConfigQuery(payloadConfig);

  useEffect(() => {
    // Verifica se o esquemático já foi previamente configurado. Se sim, redireciona para a página de visualização do mesmo
    if (data?.document?.maxDepth) {
      setTimeout(() => {
        navigate(`/esquematico-well/${well._id}`, { state: { well } });
      }, 1000);
      setTimeout(() => {
        toast.success(
          'Esquemático previamente configurado. Você será redirecionado para a página do esquemático deste poço',
          {
            id: 'toast-principal',
          },
        );
      }, 500);
    }
  }, [data]);

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
