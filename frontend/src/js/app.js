import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { create as createStore } from './data/store';
import { create as createRoutes } from './routes';
import { Dispatcher } from './data/actions';


const store = createStore(),
  Routes = createRoutes(store);
  
Dispatcher.setStore(store);


ReactDOM.render(
  <Provider store={store}>{Routes}</Provider>,
  document.getElementById('react-root')
);


