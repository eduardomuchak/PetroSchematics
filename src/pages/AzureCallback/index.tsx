import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authState, setTokenMicrosoft } from 'features/auth/authSlice';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';

function AzureCallback() {
  const { tokenMicrosoft } = useSelector(authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = window.location.href;
  const code = url.substring(url.indexOf('=') + 1, url.indexOf('&'));

  useEffect(() => {
    dispatch(setTokenMicrosoft(code));
    sessionStorage.setItem('@Origem:microsoftToken', code || '');
  }, []);

  useEffect(() => {
    if (tokenMicrosoft) {
      navigate('/login/autenticacao');
    }
  }, [tokenMicrosoft]);

  return (
    <GridLayout>
      <Loading />
    </GridLayout>
  );
}

export default AzureCallback;
