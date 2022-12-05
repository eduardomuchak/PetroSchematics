import 'styles/global.scss';
import { Routes, Route } from 'react-router-dom';

import Login from 'pages/Login';

import Layout from './components/Layout';
import RequireAuth from './features/auth/RequireAuth';
import Welcome from './features/auth/Welcome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
