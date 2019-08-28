import React, { Component} from 'react';
import PropTypes from 'prop-types';
import TabBar from './TabBar.js';
import FormWithFirebase from './Form.js';

export default class MainLogin extends Component {
        
 
      render() {
           
          const {changeTab,currentTabName,changeUserName} = this.props;
         
          return (
              <div>
              <TabBar changeTab = {changeTab} currentTabName = {currentTabName}/>
              <FormWithFirebase currentTabName = {currentTabName} changeUserName = {changeUserName}/>
          
          </div>);
      }
}
              
MainLogin.propTypes = {
    
    changeTab: PropTypes.func.isRequired,
    currentTabName: PropTypes.string.isRequired
  }
    