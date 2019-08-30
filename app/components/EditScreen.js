import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './EditScreen.css';


export default class EditScreen extends Component {
    
   
    
      render() {
        const {onClick,headerText,onChange,inputValue,isInvalid,maxLength,error,onClose} = this.props;
          return (
                <div>
                    <span onClick={onClose} className={style.backBtn}>X</span>
                    <p className={style.header}>{headerText}</p>
                    <input maxLength={maxLength} className={style.inputText} type='text' onChange={(e)=>{onChange(e)}} value={inputValue}/>
                    <button disabled={isInvalid} className ={style.submitButton} type='submit' onClick= {(e)=>{onClick(e)}}>Submit</button>
                     {error && <p className={style.errorMsg} style={{color:'red'}}>{error.message}</p>}
              </div>
            );
      }
}
    EditScreen.propTypes ={
                onClick: PropTypes.func.isRequired,
                onChange: PropTypes.func.isRequired,
                onClose: PropTypes.func.isRequired,
                headerText: PropTypes.string.isRequired,
                inputValue: PropTypes.string.isRequired,
                isInvalid: PropTypes.bool.isRequired,
                maxLength: PropTypes.number.isRequired,
            
      }
