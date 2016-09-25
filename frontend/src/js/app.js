import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { create as createStore } from './data/store';
import { create as createRoutes } from './routes';
import { Dispatcher } from './data/actions';


const store = createStore(),
  Routes = createRoutes(store);
  
Dispatcher.setup(store);


class RootComponent extends React.Component {
  render () {
    return (
      <Provider store={store}>{Routes}</Provider>
    );
  }
}


ReactDOM.render(
  <RootComponent />,
  document.getElementById('react-root'),
);


