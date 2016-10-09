import _ from 'lodash';
import React from 'react';
import { connectRedux } from '../helpers/decorators';



@connectRedux()
export default class EditorPage extends React.Component {
  render () {
    const accounts = this.props.data.chaindata.get('accounts');
    
    const acc = _.map(accounts, (balance, id) => {
      return {
        id: id,
        balance: this.props.web3.fromWei(balance, 'ether'),
      }
    });
    
    return (
      <div>
        {JSON.stringify(acc)}
      </div>
    );
  }
}

