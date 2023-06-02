import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import stockApi from '../services/stockApi';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument(stockApi)],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;