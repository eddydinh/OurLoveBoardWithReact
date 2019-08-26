import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './TabBar.css';
import TabButton from './TabButton.js'
import * as TabBarConstants from '../constants/TabBarConstants.js'

  
export default class TabBar extends Component {
    
    
     
    
    
      render() {
         let styleInlineSignup = new Object();
         let styleInlineLogIn = new Object();
         let styleInlineFloatBar = new Object();
         const {currentTabName} = this.props;
        
         
         if(currentTabName == TabBarConstants.LOG_IN){
            styleInlineLogIn.color = "#ff5d5d";
            styleInlineFloatBar.left = 0;
         }else{
             styleInlineSignup.color = "#ff5d5d";
             styleInlineFloatBar.left= 51 + '%';
          
         }
          
          return (   <div className={style.tabBar}>
          
          <TabButton onclick = {(event,tabName)=>{this.tabButtonOnClick(event,tabName)}} styleInline={styleInlineLogIn} as={TabBarConstants.LOG_IN}/>
          <TabButton onclick ={(event,tabName)=>{this.tabButtonOnClick(event,tabName)}} styleInline={styleInlineSignup}   as={TabBarConstants.SIGN_UP}/>
          <div style={styleInlineFloatBar} className={style.bottomBorder}></div>
          
          
          </div>);
      }
    
      tabButtonOnClick(event, tabName) {
          
          const {changeTab} = this.props;
          changeTab(tabName);
          let tabBtns = document.getElementsByClassName(style.tabButton);
         
          let bottomBorder = document.getElementsByClassName(style.bottomBorder)[0];
          for (let i = 0; i < tabBtns.length; i++) {
              tabBtns[i].style.color = "gray";
          }
          event.target.style.color = "#ff5d5d";
          if(tabName == TabBarConstants.LOG_IN){
               bottomBorder.classList.remove(style.moveforward);
               bottomBorder.classList.add(style.movebackward);
            
          }else{
               bottomBorder.classList.remove(style.movebackward);
               bottomBorder.classList.add(style.moveforward);
            
          }
          
      }
}
TabBar.propTypes = {

    changeTab: PropTypes.func.isRequired,
    currentTabName: PropTypes.string.isRequired
}