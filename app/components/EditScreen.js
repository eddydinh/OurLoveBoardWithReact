import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './EditScreen.css';


export default class EditScreen extends Component {
    
   
    
      render() {
        const {onClick,headerText,onChange,inputValue,isInvalid} = this.props;
          return (
                <div>
                    <p className={style.header}>{headerText}</p>
                    <input maxLength={20} className={style.inputText} type='text' onChange={(e)=>{onChange(e)}} value={inputValue}/>
                    <button disabled={isInvalid} className ={style.submitButton} type='submit' onClick= {(e)=>{onClick(e)}}>Submit</button>
              </div>
            );
      }
}
    EditScreen.propTypes ={
                onClick: PropTypes.func.isRequired,
                onChange: PropTypes.func.isRequired,
                headerText: PropTypes.string.isRequired,
                inputValue: PropTypes.string.isRequired,
                isInvalid: PropTypes.bool.isRequired,
                
      }
