import { useEffect, useState } from 'react';

import { Text } from '@chakra-ui/react';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';

import { getApiTurnos } from './api/get';

function AzureCallback() {
  const [loading, setLoading] = useState(true);
  const [teste, setTeste] = useState([]);

  const handleGetAll = async () => {
    const req = await getApiTurnos();
    setTeste(req.data);
    setLoading(false);
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  if (loading) {
    return (
      <GridLayout>
        <Loading />
      </GridLayout>
    );
  }

  return (
    <GridLayout>
      <Text>{JSON.stringify(teste)}</Text>;
    </GridLayout>
  );
}

export default AzureCallback;
