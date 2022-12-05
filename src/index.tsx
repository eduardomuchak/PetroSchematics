import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { store } from 'app/store';

import { ToastProvider } from 'contexts/Toast';

import App from './App';
import theme from './styles/index';

import 'styles/global.scss';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>,
);
