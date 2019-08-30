
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './MessageScreen.css';




export default class HasPartnerScreen extends Component {
    
   
    
      render() {
        const {yesFunction,noFunction,headerText,yesText, noText} = this.props;
          return (
              <div>
              <p className={style.header}>{headerText}</p>
              <br></br>
               {yesFunction && <button className ={style.Button} type='button' onClick= {yesFunction}>{yesText || `YES`}</button>}
               {noFunction && <button className ={style.Button} type='button' onClick= {noFunction}>{noText || 'NO'}</button>}
              </div>
            );
      }
}

    