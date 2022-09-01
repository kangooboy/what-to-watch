import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction } from './store/api-action';
import { getToken } from './services/token';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';

if(getToken()) {
  store.dispatch(checkAuthAction());
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>,
);
