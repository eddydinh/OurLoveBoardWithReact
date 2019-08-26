import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainLogin from '../components/MainLogin';
import * as TodoActions from '../actions/actions';
import style from './App.css';
import HomePage from '../components/HomePage';
import PasswordForgetPage  from '../components/PasswordForget';
import { withFirebase } from '../components/Firebase';
@connect(
  state => ({
    reducers: state.reducers
    
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
class App extends Component {

  
  componentDidMount() {
    const {actions,reducers} = this.props;
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? actions.changeAuth({authUser})
          : actions.changeAuth(null);
          
      },
    );
  }
  componentWillUnmount() {
    this.listener();
  }
    
  RenderMainSection (){
      const {reducers,actions} = this.props;
      if(reducers.isForgotPassword) return (<PasswordForgetPage/>);
      else if(reducers.authUser) return(<Home /> );
      else return(<LandingPage  changeTab = {actions.changeTab}  currentTabName = {reducers.tab} />)
  }    
  render() {

     
    return (

      <div className={style.normal}>
        <Header />
        {this.RenderMainSection()}
        
      </div>
            
    );
  }
}

const LandingPage = (props)=>(<MainLogin changeTab={props.changeTab} currentTabName= {props.currentTabName}/>);

const Home = ()=>(<HomePage />);

export default withFirebase(App);


