import _ from 'lodash';
import React from 'react';
import Account from './account';
import { css } from 'aphrodisiac';
import styles from '../styles/components/accountList';


export default class Component extends React.Component {
  render () {
    const accounts = _.map(this.props.accounts, (data, id) => 
      <Account id={id} data={data} key={id} />
    );
    
    return (
      <div className={css(styles.main)}>
        {accounts}
      </div>
    );
  }
}




