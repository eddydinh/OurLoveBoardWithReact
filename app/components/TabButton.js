import React, { Component, PropTypes } from 'react';
import style from './TabBar.css';
export default class TabButton extends Component {
    
     static propTypes = {

         as: PropTypes.string.isRequired,
         onclick: PropTypes.func.isRequired,
      

     };

      
    
      render() {
          const {as, onclick} = this.props;
          let styleInline ={};
          if (as==="Login") styleInline.color = "#ff5d5d";
          return(
              
              <div className={style.tabButton} style={styleInline} onClick={(e)=>{onclick(e,as)}}>{as}</div>
          
          )
          
          }
      
      }

    