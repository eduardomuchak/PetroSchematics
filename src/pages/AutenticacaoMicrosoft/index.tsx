import { useEffect, useState } from 'react';

import { Text } from '@chakra-ui/react';
import { useGetTesteQuery } from 'features/service/microsoftApi';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';

function AutenticacaoMicrosoft() {
  const [teste, setTeste] = useState([]);
  const getTeste = useGetTesteQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (getTeste?.data) {
      setTeste(getTeste.data);
    }
  }, [getTeste.data]);

  if (getTeste.isLoading || teste.length === 0) {
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

export default AutenticacaoMicrosoft;
