import React from 'react';
import { BaseComponent } from '../helpers/components';
import { connectRedux } from '../helpers/decorators';


@connectRedux()
export default class EditorPage extends BaseComponent {
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

