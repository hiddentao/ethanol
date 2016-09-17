import Q from 'bluebird';
import React from 'react';
import { BaseComponent } from '../helpers/components';
import { connectRedux, connectRouter } from '../helpers/decorators';


class InitPage extends BaseComponent {
  render () {
    return (
      <div id="init page">
        "asdfasdfsd"
      </div>
    );
  }

  componentDidMount () {
    this.props.dispatcher.init();
    
    Q.delay(5000)
    .then(() => {
      this.props.router.push('/editor');
    });
  }
}


module.exports = connectRedux()(connectRouter()(InitPage));

