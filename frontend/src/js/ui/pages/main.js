import React from 'react';
import { css } from 'aphrodisiac';
import Accounts from '../components/accounts';
import { connectRedux } from '../helpers/decorators';
import styles from '../styles/pages';



@connectRedux()
export default class EditorPage extends React.Component {
  render () {
    const data = this.props.data;
    
    return (
      <div className={css(styles.main)}>
        <div>editor</div>
        <div>execution</div>
        <div>
          <h2>Accounts</h2>
          <Accounts />
        </div>
      </div>
    );
  }
}

