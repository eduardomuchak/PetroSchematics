import * as ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

import { App } from './App';
import theme from './styles/index';

import 'styles/global.scss';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
);
