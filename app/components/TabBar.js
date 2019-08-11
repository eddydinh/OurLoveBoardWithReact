import React, { Component, PropTypes } from 'react';
import style from './TabBar.css';
import TabButton from './TabButton.js'
export default class TabBar extends Component {
    
    
     static propTypes = {
    
    changeTab: PropTypes.func.isRequired
  };
    
    
      render() {
          
         
        
          return (   <div className={style.tabBar}>
          
          <TabButton onclick = {(event,tabName)=>{this.tabButtonOnClick(event,tabName)}}  as={"Login"}/>
          <TabButton onclick ={(event,tabName)=>{this.tabButtonOnClick(event,tabName)}}   as={"Signup"}/>
          <div className={style.bottomBorder}></div>
          
          
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
          if(tabName == "Login"){
               bottomBorder.classList.remove(style.moveforward);
               bottomBorder.classList.add(style.movebackward);
            
          }else{
               bottomBorder.classList.remove(style.movebackward);
               bottomBorder.classList.add(style.moveforward);
            
          }
          
      }
}
    