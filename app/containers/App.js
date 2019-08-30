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
    const {actions,reducers,firebase} = this.props;
    this.listener = firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser) {
            actions.changeAuth(authUser)
            
            this.listenerDb = firebase.user(authUser.uid).on('value',
                (snapshot, context) => {
                    if(snapshot.val().hasPartner) 
                        actions.changeStatus({status:"hasPartner", value:snapshot.val().hasPartner});
                
                    else if (snapshot.val().hasRequest)     
                        actions.changeStatus({status:"hasRequest", value:snapshot.val().hasRequest});
                
                    else if (snapshot.val().isPending) 
                        actions.changeStatus({status:"isPending", value:snapshot.val().isPending});
                
                    else
                        actions.changeStatus(null);
                      
                    
                    

                },
            );
        }
        else{
            actions.changeAuth(null);
        }
        
        
          
      },
    );
    
    
      
    
  }
  componentWillUnmount() {
    this.listener();
    this.listenerDb();
  }
    
  RenderMainSection (){
      const {reducers,actions} = this.props;
      if(reducers.isForgotPassword) return (<PasswordForgetPage/>);
      else if(reducers.authUser) return(<Home /> );
      else return(<LandingPage  changeTab = {actions.changeTab}  currentTabName = {reducers.tab} changeUserName={actions.changeUserName} />)
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

const LandingPage = (props)=>(<MainLogin changeTab={props.changeTab} currentTabName= {props.currentTabName} changeUserName ={props.changeUserName}/>);

const Home = ()=>(<HomePage />);

export default withFirebase(App);


