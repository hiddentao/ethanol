import Q from 'bluebird';
import React from 'react';
import { BaseComponent } from '../helpers/components';
import { connectRedux, connectRouter } from '../helpers/decorators';
import { css } from 'aphrodisiac';
import styles from '../styles/pages';


@connectRedux()
@connectRouter()
export default class InitPage extends BaseComponent {
  render () {
    return (
      <div className={css(styles.page, styles.init)}>
        <p>asdfasdf</p>
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


