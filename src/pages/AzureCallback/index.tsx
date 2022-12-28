import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Text } from '@chakra-ui/react';
import { setTokenMicrosoft } from 'features/auth/authSlice';
import { useGetMicrosoftTokenQuery } from 'features/microsoft/service/microsoftApi';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';

function AzureCallback() {
  const dispatch = useDispatch();
  const [teste, setTeste] = useState([]);
  const getMicrosoftToken = useGetMicrosoftTokenQuery({ refetchOnMountOrArgChange: true });

  const url = window.location.href;
  const code = url.substring(url.indexOf('=') + 1, url.indexOf('&'));

  useEffect(() => {
    dispatch(setTokenMicrosoft(code));
  }, []);

  useEffect(() => {
    if (getMicrosoftToken?.data) {
      setTeste(getMicrosoftToken.data);
    }
  }, [getMicrosoftToken.data]);

  if (getMicrosoftToken.isLoading || teste.length === 0) {
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
