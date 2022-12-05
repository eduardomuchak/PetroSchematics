import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from 'features/auth/authApiSlice';
import { setCredentials } from 'features/auth/authSlice';

const Login = () => {
  const userRef = useRef<HTMLInputElement | any>(null);
  const errRef = useRef<HTMLInputElement | any>(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, senha]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await login({ email, senha }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail('');
      setSenha('');
      navigate('/style-guide');
    } catch (err) {
      // if (!err?.originalStatus) {
      //   // isLoading: true until timeout occurs
      //   setErrMsg('No Server Response');
      // } else if (err.originalStatus === 400) {
      //   setErrMsg('Missing Username or Password');
      // } else if (err.originalStatus === 401) {
      //   setErrMsg('Unauthorized');
      // } else {
      //   setErrMsg('Login Failed');
      // }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section>
          <p ref={errRef} aria-live="assertive">
            {errMsg}
          </p>

          <h1>Origem DaaS</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              value={email}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" onChange={handlePasswordInput} value={senha} required />
            <button>Entrar</button>
          </form>
        </section>
      )}
    </>
  );
};
export default Login;
