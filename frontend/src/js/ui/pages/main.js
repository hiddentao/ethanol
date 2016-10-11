import React from 'react';
import AccountList from '../components/accountList';
import { connectRedux } from '../helpers/decorators';
import { css } from 'aphrodisiac';
import styles from '../styles/pages';



@connectRedux()
export default class EditorPage extends React.Component {
  render () {
    const data = this.props.data,
      accounts = data.chaindata.get('accounts');
    
    return (
      <div className={css(styles.main)}>
        <div>editor</div>
        <div>execution</div>
        <div>
          <h2>Accounts</h2>
          <AccountList accounts={accounts} />
        </div>
      </div>
    );
  }
}

