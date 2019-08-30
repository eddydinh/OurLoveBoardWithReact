
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './HasPartnerScreen.css';


export default class HasPartnerScreen extends Component {

      render() {
        const {onBreakup,partnerName} = this.props;
       
           return (
              <div>
               <button className={style.breakupBtn} onClick = {onBreakup}>X</button>
               <div style={{width:'auto'}}>{partnerName}</div>
              </div>
            );
      }
}
HasPartnerScreen.propTypes ={
    onBreakup:PropTypes.func.isRequired,
    partnerName: PropTypes.string.isRequired,

  }
    