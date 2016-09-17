import React from 'react';
import { BaseComponent } from '../helpers/components';
import { connectRedux } from '../helpers/decorators';


class HomePage extends BaseComponent {
  render () {
    return (
      <div id="home page">
        <p>Home page oh yeha baby!</p>
        <p>Home page oh yeha baby!</p>
      </div>
    );
  }
}



module.exports = connectRedux()(HomePage);