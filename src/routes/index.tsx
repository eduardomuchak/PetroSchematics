import { Routes, Route } from 'react-router-dom';

import RequireAuth from 'features/auth/RequireAuth';
import Welcome from 'features/auth/Welcome';

import Login from 'pages/Login';
import SchematicWell from 'pages/schematicWell';

import Layout from 'components/Layout';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route path="schematic" element={<SchematicWell />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}
