import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectCurrentUser, selectCurrentToken } from './authSlice';

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Bem vindo, ${user}!` : 'Bem vindo!';
  const tokenAbbr = `${token?.slice(0, 9)}...`;

  return (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>
        <Link to="/style-guide">Guia de estilos</Link>
      </p>
    </section>
  );
};
export default Welcome;
