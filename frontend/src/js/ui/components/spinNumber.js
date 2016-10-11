import _ from 'lodash';
import React from 'react';
import { css } from 'aphrodisiac';
import styles from '../styles/components';


export default class Component extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: this._round(props.value),
    };
  }
  
  render () {
    return (
      <span className={css(styles.spinNumber)}>
        {this.state.value}
      </span>
    );
  }
  
  componentWillReceiveProps (props) {
    clearInterval(this._updateTimer);
    
    const newValue = this._round(props.value);
    
    this._updateTimer = setInterval(() => {
      if (this.state.value !== newValue) {
        const interimValue = this._round(
          this.state.value + (newValue - this.state.value) / 2
        );
        
        this.setState({
          value: interimValue,
        });
      } else {
        clearInterval(this._updateTimer);
      }
    }, 50);
  }
  
  _round (val) {
    return parseFloat(Number(val).toFixed(this.props.decimalPlaces));
  }
}

