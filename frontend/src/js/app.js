import React from 'react';

import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { create as createStore } from './data/store';

import Layout from './ui/layout';
import HomePage from './ui/pages/home';



var App = 
  React.createClass({
    childContextTypes: {
      router: React.PropTypes.object,
      routeParams: React.PropTypes.object,
      location: React.PropTypes.object,
    },

    getChildContext: function() {
      return {
        routeParams: this.props.params,
        location: this.props.location,
      };
    },

    render: function () {
      return (
        <Layout {...this.props}>
          {this.props.children}
        </Layout>
      );
    },
  })
;


const store = createStore();


const Routes = (
  <Route component={App}>
    <IndexRoute component={HomePage} />
    <Route path="*" component={HomePage} />
  </Route>
);


class RootComponent extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {Routes}
        </Router>
      </Provider>
    );
  }
}



ReactDOM.render(
  <RootComponent />,
  document.getElementById('react-root'),
);


