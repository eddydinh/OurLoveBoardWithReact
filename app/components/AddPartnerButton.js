import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './AddPartnerButton.css';


export default class AddPartnerButton extends Component {
    
   
    
      render() {
      const{onClick} = this.props;
          return (
                <button onClick= {onClick} className={style.AddButton}><span>+</span></button>
            );
      }
}
AddPartnerButton.propTypes ={
    onClick: PropTypes.func.isRequired,

  }
    