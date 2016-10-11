import _ from 'lodash';
import React from 'react';
import Account from './account';
import SpinNumber from './spinNumber';
import { css } from 'aphrodisiac';
import styles from '../styles/components/account';


export default class Component extends React.Component {
  render () {
    const id = this.props.id,
      { wei, ether } = this.props.data;
      
    return (
      <div className={css(styles.main)}>
        <h2 className={css(styles.id)}>{id}</h2>
        <span className={css(styles.balance)}>
          <SpinNumber value={ether} decimalPlaces={2} />
          <span className={css(styles.etherSuffix)}>ether</span>
        </span>
      </div>
    );
  }
}

