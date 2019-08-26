import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './MainLogin.css';
import TabBar from './TabBar.js';
import FormWithFirebase from './Form.js';
export default class MainLogin extends Component {
        
 
      render() {
           
          const {changeTab,currentTabName} = this.props;
         
          return (
              <div>
              <TabBar changeTab = {changeTab} currentTabName = {currentTabName}/>
              <FormWithFirebase currentTabName = {currentTabName}/>
          
          </div>);
      }
}
              
MainLogin.propTypes = {
    
    changeTab: PropTypes.func.isRequired,
    currentTabName: PropTypes.string.isRequired
  }
    