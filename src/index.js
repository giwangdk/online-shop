import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import productsReducer from './featues/productsSlice';
import { productsApi } from './features/productsApi';

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath] : productsApi.reducer,
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


