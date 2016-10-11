import _ from 'lodash';
import React from 'react';
import Account from './account';
import SpinNumber from './spinNumber';
import { css } from 'aphrodisiac';
import styles from '../styles/components';


export default class Component extends React.Component {
  render () {
    const id = this.props.id,
      { wei, ether } = this.props.data;
      
    return (
      <div className={css(styles.account)}>
        <h2>{id}</h2>
        <span>
          <SpinNumber value={ether} decimalPlaces={2} />ETHER
        </span>
      </div>
    );
  }
}

