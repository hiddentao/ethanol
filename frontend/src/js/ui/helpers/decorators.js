import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatcher } from '../../data/actions';


/**
 * Connect a component to the Redux store and action creators.
 */
export function connectRedux() {
  return function decorator(Component) {
    return connect(
      function mapStateToProps(state) {
        return {
          data: state
        };
      },
      function mapDispatchToProps(dispatch) {
        let dispatcher;
        
        dispatch((dispatch, getState) => {
          dispatcher = new Dispatcher(dispatch, getState);
        });
        
        return {
          dispatcher: dispatcher,
        };
      },
      null,
      { withRef: true }
    )(Component);
  }
}


export function routing() {
  return function decorator(Component) {
    return React.createClass({
      contextTypes: {
        router: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired,
        routeParams: React.PropTypes.object,
      },

      render: function() {
        let props = _.extend({}, this.props, this.context);

        return (
          <Component {...props} />
        );
      }
    });
  };
}


