import React from 'react';
import Accounts from '../components/accounts';
import { connectRedux } from '../helpers/decorators';



@connectRedux()
export default class EditorPage extends React.Component {
  render () {
    const data = this.props.data;
    
    return (
      <div>
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

