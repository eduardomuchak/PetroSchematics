import { Routes, Route } from 'react-router-dom';

import RequireAuth from 'features/auth/RequireAuth';
import Welcome from 'features/auth/Welcome';

import { Aprovacaopage } from 'pages/Aprovacao';
import { Formulariopage } from 'pages/Formulario';
import Login from 'pages/Login';
import { NotFound } from 'pages/NotFound';
import SchematicWell from 'pages/SchematicWell';
import { StyleGuide } from 'pages/StyleGuide';
import { UnderDevelopment } from 'pages/UnderDevelopment';

import Layout from 'components/Layout';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route path="esquematico-well" element={<SchematicWell />} />
        <Route path="style-guide" element={<StyleGuide />} />
        <Route path="cadastre-se" element={<UnderDevelopment />} />
        <Route path="esqueci-a-senha" element={<UnderDevelopment />} />
        <Route path="*" element={<NotFound />} />
        <Route path="aprovacao" element={<Aprovacaopage />} />
        <Route path="formulario" element={<Formulariopage />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="boas-vindas" element={<Welcome />} />
          <Route path="configuracoes" element={<UnderDevelopment />} />
          <Route path="perfil" element={<UnderDevelopment />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
