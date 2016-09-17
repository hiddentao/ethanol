import React from 'react';

import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { create as createStore } from './data/store';
import { connectRedux } from './ui/helpers/decorators';
import HomePage from './ui/pages/home';



var App = connectRedux()(
  React.createClass({
    render: function() {
      return this.props.children;
    },
    componentDidMount: function () {
      this.props.dispatcher.init();
    },
  })
);


const store = createStore();


class RootComponent extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={App}>
            <IndexRoute component={HomePage} />
            <Route path="*" component={HomePage} />
          </Route>
        </Router>
      </Provider>
    );
  }
}



ReactDOM.render(
  <RootComponent />,
  document.getElementById('react-root'),
);


