import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './TextInput.css';
export default class TextInput extends Component {
     
    

      render() {
          const {as,value,onChange} = this.props
          
         
          
          return (
              
              <div className={style.tab}>
                <input className={[style.inputText, style[as]].join(' ')} name={as} type={as} placeholder={`          Your ${as}`} value={value} onChange={(event)=>{onChange(event);}}></input>
              </div>
              
      );
}
   }
TextInput.propTypes ={

        as: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired


    }