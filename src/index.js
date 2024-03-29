import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import App from './components/App';


const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(  
<Provider store={store}>
  <App />
  </Provider>,
);