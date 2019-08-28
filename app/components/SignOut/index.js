import React from 'react';
import { withFirebase } from '../Firebase';
import style from './SignOutButton.css'
const SignOutButton = ({ firebase }) => (
  <img src='/img/LOGOUTsanstext.png' width="20px" height="30px"
  className = {
      style.signOutButton
  }
  onClick = {firebase.doSignOut}/>
    
  
);

export default withFirebase(SignOutButton);