import React, { Component, PropTypes } from 'react';
import style from './MainLogin.css';
import TabBar from './TabBar.js';
import Form from './Form.js';
export default class MainLogin extends Component {
        
    static propTypes = {
    
    changeTab: PropTypes.func.isRequired,
    currentTabName: PropTypes.string.isRequired
  };
    
      render() {
           
          const {changeTab,currentTabName} = this.props;
         
          return (
              <div>
              <TabBar changeTab = {changeTab} />
              <Form currentTabName = {currentTabName}/>
          
          </div>);
      }
}
    