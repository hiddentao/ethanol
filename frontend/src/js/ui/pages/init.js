import Q from 'bluebird';
import React from 'react';
import { connectRedux, connectRouter } from '../helpers/decorators';
import { css } from 'aphrodisiac';
import styles from '../styles/pages';


@connectRedux()
@connectRouter()
export default class InitPage extends React.Component {
  render () {
    const appState = this.props.data.app,
      initialization = appState.get('initialization'),
      backendInitialization = appState.get('backendInitialization'),
      web3Initialization = appState.get('web3Initialization');
      
    const initMsg = ('in_progress' === initialization.getState()) 
      ? 'Initializing...' 
      : 'Initialized!';
    
    let progressMsgs = [];
    
    if ('in_progress' === backendInitialization.getState()) {
      progressMsgs.push(backendInitialization.getData() || 'Initializing backend');
    }
      
    if ('in_progress' === web3Initialization.getState()) {
      progressMsgs.push(web3Initialization.getData() || 'Initializing web3');
    }
    
    const progressMsg = progressMsgs.length ? (progressMsgs.map(
      (msg, idx) => <li key={idx}>{msg}</li>
    )) : (
      <li>Please wait...</li>
    );

    return (
      <div className={css(styles.page, styles.init)}>
        <h2>{initMsg}</h2>
        <ul>{progressMsg}</ul>
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
      this.props.router.push('/main');
    } 
    // if not yet initialized then do so
    else if ('ready' === initState) {
      this.props.dispatcher.init();
    }
  }
}


