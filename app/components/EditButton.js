
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './EditButton.css';




export default class EditButton extends Component {
    
   
    
      render() {
        const {onClick} = this.props;
          return (
              <img src = '/img/EditPen.png'
                    width = "15px"
                    height = "15px"
                    className = {
                        style.editButton
                    }
                    onClick = {
                        onClick
                    }/>
            );
      }
}
EditButton.propTypes ={
    onClick:PropTypes.func.isRequired

  }
    