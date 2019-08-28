import React, { Component} from 'react';
import PropTypes from 'prop-types';
import SignOutButton from './SignOut';
import CoupleBar from './CoupleBar';

export default class HomePage extends Component {
      
 
      render() {
           
       
         
          return (
              <div>
            <CoupleBar/>
            <SignOutButton/>
          
          </div>);
      }
}
HomePage.propTypes = {
    
 
}
    