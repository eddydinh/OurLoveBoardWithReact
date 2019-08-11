import React, { Component, PropTypes } from 'react';
import style from './FormButton.css'
export default class FormCheckBox extends Component {
    
       static propTypes = {
    
    
    currentTabName: PropTypes.string.isRequired
  };
    
      render() {
          
          const {currentTabName} = this.props
          
          return (
              <div className={style.formButton}><h2>{currentTabName} > </h2></div>
            );
      }
}
    