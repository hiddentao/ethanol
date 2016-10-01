import React from 'react';
import { connectRedux } from '../helpers/decorators';


@connectRedux()
export default class EditorPage extends React.Component {
  render () {
    const data = this.props.data;
    
    const content = this._buildEditor();
      
    return (
      <div id="home page">
        {content}
      </div>
    );
  }
  
  _buildEditor() {
    return (
      <div>
        <p>Ready!</p>
      </div>
    );
  }
}

