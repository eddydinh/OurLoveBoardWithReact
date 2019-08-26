import React from 'react';
import { withFirebase } from '../Firebase';
import style from './SignOutButton.css'
const SignOutButton = ({ firebase }) => (
  < button type = "button"
  className = {
      style.signOutButton
  }
  onClick = {firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);