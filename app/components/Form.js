import React, { Component, PropTypes } from 'react';
import TextInput from './TextInput';
import FormButton from './FormButton';
import FormCheckBox from './FormCheckBox';
export default class Form extends Component {
    
       static propTypes = {
    
    
    currentTabName: PropTypes.string.isRequired
  };
    
      render() {
          
         const {currentTabName} = this.props
          
          return (
              <div>
              <div style={{marginTop: 50 +'px'}}>
                <TextInput as={'email'}/>
              <TextInput as={'password'}/>
               <FormCheckBox/>
              </div>
              <FormButton currentTabName = {currentTabName}/>
              </div>);
      }
}
    