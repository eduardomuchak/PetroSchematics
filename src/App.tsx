import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './redux/store';
import { MainRoutes } from './routes';

import 'styles/global.scss';

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </Provider>
  );
}
