import React, { Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import FormButton from './FormButton';
//import FormCheckBox from './FormCheckBox';
import { withFirebase } from './Firebase';
import * as TabBarConstants from '../constants/TabBarConstants.js'
import { PasswordForgetLink } from './PasswordForget';
const INITIAL_STATE ={
    email: '',
    password: '',
    stayLoggedIn: false,
    error: null,
}
class Form extends Component {
    

       constructor(props){
           super(props);
           this.state = { ...INITIAL_STATE};
       }
    
       onSubmit = event => {
          

          const {
            
              email,
              password
          } = this.state;
           
          const {currentTabName, firebase} = this.props;
          
          if (currentTabName == TabBarConstants.SIGN_UP){
              firebase.doCreateUserWithEmailAndPassword(email, password)
                  .then(authUser => {
                      this.setState({ ...INITIAL_STATE
                      });
                     

                  })
                  .catch(error => {
                      this.setState({
                          error
                      });
                  });

              }
              else {
                  firebase
                      .doSignInWithEmailAndPassword(email, password)
                      .then(() => {
                          this.setState({ ...INITIAL_STATE
                          });
                          
                      })
                      .catch(error => {
                          this.setState({
                              error
                          });
                      });
          }
          

          event.preventDefault();
       }

       onChange = event => {
           this.setState({  [event.target.name]: event.target.value});
    

       }
      render() {
         const {
             email, password,stayLoggedIn,error
         } = this.state;
         const isInvalid = password === '' ||
             email === '';
          
         
       
         const {currentTabName} = this.props
        
          
          return (
              <div>
              
              <div style={{marginTop: 50 +'px'}}>
              
              <TextInput onChange={this.onChange} as={'email'} value = {email}/>
              
              <TextInput  onChange={this.onChange} as={'password'} value={password}/>
              
              
               <PasswordForgetLink />
               
              {error && <p style={{textAlign:'center', color:'red'}}>{error.message}</p>}
              
              </div>
              
              <FormButton disabled = {isInvalid} currentTabName = {currentTabName} onclick={this.onSubmit}/>
              
              </div>)
          
      }
}
        
const FormWithFirebase = withFirebase(Form);
export default FormWithFirebase;

Form.propTypes ={


           currentTabName: PropTypes.string.isRequired
       }
    