import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { create as createStore } from './data/store';
import { create as createRoutes } from './routes';


const store = createStore(),
  Routes = createRoutes(store);


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


