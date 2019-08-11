import React, { Component, PropTypes } from 'react';
import style from './TextInput.css';
export default class TextInput extends Component {
     
    
    static propTypes = {

         as: PropTypes.string.isRequired,
        

     };

      render() {
          const {as} = this.props
          
         
          
          return (
              
              <div className={style.tab}>
                <input className={[style.inputText, style[as]].join(' ')} name={as} type={as} placeholder={`          Your ${as}`}></input>
              </div>
              
      );
}
   }
    