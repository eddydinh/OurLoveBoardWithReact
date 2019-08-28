import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './TabBar.css';
export default class TabButton extends Component {
    
      
    
      render() {
          const {as, onclick, styleInline} = this.props;
          
          return(
              
              <div className={style.tabButton} style={styleInline} onClick={(e)=>{onclick(e,as)}}>{as}</div>
          
          )
          
          }
      
      }
    TabButton.propTypes = {

        as: PropTypes.string.isRequired,
        onclick: PropTypes.func.isRequired,
        styleInline: PropTypes.object.isRequired,


    }
