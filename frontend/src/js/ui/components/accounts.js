import React from 'react';
import { connectRedux } from '../helpers/decorators';



@connectRedux()
export default class EditorPage extends React.Component {
  render () {
    return (
      <div>
        Accounts
      </div>
    );
  }
}

