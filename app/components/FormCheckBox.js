import React, { Component, PropTypes } from 'react';
import style from './FormCheckBox.css'
export default class FormCheckBox extends Component {
      render() {
          
          return (
              <label className={style.checkBoxContainer}>Stay logged in
                 <input type="checkbox" defaultChecked ="true"></input>
                 <span className={style.checkmark}></span>
            </label>
            );
      }
}
    