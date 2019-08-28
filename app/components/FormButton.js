import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './FormButton.css'
export default class FormButton extends Component {
    

    
      render() {
          
          const {currentTabName,onclick, disabled} = this.props
          
          return (
              <button type = "submit" disabled={disabled} className={style.formButton} onClick = {(e)=>{onclick(e);}}>{currentTabName} ></button>
            );
      }
}
    FormButton.propTypes ={
        
        currentTabName: PropTypes.string.isRequired,
        onclick: PropTypes.func.isRequired
        
      }
