import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from '../Firebase';
import style from './PasswordForget.css'
import * as TodoActions from '../../actions/actions';

const PasswordForgetPage = () => (
  <div>
  
    <PasswordForgetForm />
  </div>
);
const INITIAL_STATE = {
  email: '',
  error: null,
};

@connect(
null,
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onBackBtnClick = event =>{
      const {actions} = this.props;
      console.log(actions);
      actions.changeIsForgotPassword(false)
  }
  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    
  
    
    return (
    <div>
      
    <div className = {style.backBtn} onClick={(e)=>this.onBackBtnClick(e)}>
          &larr; BACK
    </div>
      <form  onSubmit={this.onSubmit}>
        <div style= {{marginTop: 50 +'px', textAlign: 'center'}}>
        <input
          className = {[style.inputText, style.email].join(' ')}
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="          Your email"
        />
        </div>
               {error && <p style={{textAlign:'center', color:'red'}}>{error.message}</p>}
        <button className ={style.formButton} disabled={isInvalid} type="submit">
          Reset Password
        </button>
 
      </form>
</div>
    );
  }
}
@connect(
null,
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
class PasswordForgetLink extends Component {

renderPaswordForgetPage= event =>{
    const{actions} = this.props;
    actions.changeIsForgotPassword(true);
    
    
}
render(){

    
return(
  <div onClick = {(e)=>this.renderPaswordForgetPage(e)} className={style.PasswordForgetLink}>
   Forgot Password?
  </div>)
}
}
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };