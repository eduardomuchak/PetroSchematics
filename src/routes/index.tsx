import { Routes, Route } from 'react-router-dom';

import RequireAuth from 'features/auth/RequireAuth';
import Welcome from 'features/auth/Welcome';

import { Aprovacaopage } from 'pages/Aprovacao';
import Login from 'pages/Login';
import { NotFound } from 'pages/NotFound';
import SchematicWell from 'pages/schematicWell';
import { StyleGuide } from 'pages/StyleGuide';

import Layout from 'components/Layout';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route path="esquematico-well" element={<SchematicWell />} />
        <Route path="cadastre-se" element={<NotFound />} />
        <Route path="esqueci-a-senha" element={<NotFound />} />
        <Route path="aprovacao" element={<Aprovacaopage />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="boas-vindas" element={<Welcome />} />
          <Route path="style-guide" element={<StyleGuide />} />
        </Route>
      </Route>
    </Routes>
  );
}
