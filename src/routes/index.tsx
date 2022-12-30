import { Routes, Route, useLocation } from 'react-router-dom';

import RequireAuth from 'features/auth/RequireAuth';
import { AnimatePresence } from 'framer-motion';

import { Aprovacaopage } from 'pages/Aprovacao';
import AutenticacaoMicrosoft from 'pages/AutenticacaoMicrosoft';
import AzureCallback from 'pages/AzureCallback';
import { Formulariopage } from 'pages/Formulario';
import LoginMicrosoft from 'pages/MicrosoftLogin';
import { NotFound } from 'pages/NotFound';
import SchematicWell from 'pages/SchematicWell';
import SchematicWellConfig from 'pages/SchematicWellConfig';
import { StyleGuide } from 'pages/StyleGuide';
import { UnderDevelopment } from 'pages/UnderDevelopment';
import WellsList from 'pages/WellsList';

import Layout from 'components/Layout';

export function MainRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<LoginMicrosoft />} />
          <Route path="*" element={<NotFound />} />
          <Route path="login/azurecallback" element={<AzureCallback />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="*" element={<NotFound />} />
            <Route path="configuracoes" element={<UnderDevelopment />} />
            <Route path="esquematico-well/:id" element={<SchematicWell />} />
            <Route path="esquematico-well/config/:id" element={<SchematicWellConfig />} />
            <Route path="esquematico-well/lista-pocos" element={<WellsList />} />
            <Route path="style-guide" element={<StyleGuide />} />
            <Route path="login/autenticacao" element={<AutenticacaoMicrosoft />} />
            <Route path="aprovacao" element={<Aprovacaopage />} />
            <Route path="formulario" element={<Formulariopage />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
