import React from 'react';


export default class Layout extends React.Component {
  render () {
    return (
      <div id="layout">
        {this.props.children}
      </div>
    );
  }
}
