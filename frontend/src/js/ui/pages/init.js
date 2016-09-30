import Q from 'bluebird';
import React from 'react';
import { BaseComponent } from '../helpers/components';
import { connectRedux, connectRouter } from '../helpers/decorators';


class InitPage extends BaseComponent {
  render () {
    return (
      <div id="init page">
        "initializing..."
      </div>
    );
  }
  
  componentDidUpdate () {
    this._initializeOrRedirect();
  }

  componentDidMount () {
    this._initializeOrRedirect();
  }
  
  _initializeOrRedirect () {
    const initState = this.props.data.app.get('initialization').getState();

    // once initializion is successful go to editor page
    if ('success' === initState) {
      this.props.router.push('/editor');
    } 
    // if not yet initialized then do so
    else if ('ready' === initState) {
      this.props.dispatcher.init();
    }
  }
}


module.exports = connectRedux()(connectRouter()(InitPage));

