import React, { Component} from 'react';
import PropTypes from 'prop-types';
import EditButton from './EditButton';
import EditScreen from './EditScreen';
import { withFirebase } from '../components/Firebase';


const INITIAL_STATE ={
    isEditScreenOpen: false,
    editScreenValue: '',
    error:null
}
class UserName extends Component {
    constructor(props){
        super(props);
         this.state = { ...INITIAL_STATE};
    }
    
    
    displayEditScreen(isOpen){
          this.setState({  isEditScreenOpen: isOpen});
        
    }
    

    
    editScreenOnSubmit = event =>{
        const {editScreenValue} = this.state;
        const {firebase,changeUserName} = this.props;
        const userId = firebase.auth.currentUser.uid;
     
        return firebase
                          .user(userId)
                          .update({
                              username:editScreenValue
                          }, (error)=>{
                                if (error) {
                                    this.setState({
                                        error: error
                                    });
                                } else {
                                     changeUserName(editScreenValue);
                                    this.displayEditScreen(false);
                                }
        });
        
    }
    
    editScreenOnChange = event =>{
        this.setState({  editScreenValue: event.target.value});
    }
    
    editScreenOnClose = () =>{
        this.setState({...INITIAL_STATE});
        const {userName} = this.props;
        this.setState({editScreenValue: userName});
        this.displayEditScreen(false); 
    }
    
      render() {
        const {userName} = this.props;
        const {isEditScreenOpen,editScreenValue,error} = this.state;
        const isInvalid = editScreenValue == '';
          if(isEditScreenOpen){
              return(
                <div>
                <EditScreen onClose ={()=>{this.editScreenOnClose();}} maxLength={20} isInvalid={isInvalid} inputValue={editScreenValue} headerText={"Type in your new user name & submit"} onChange={this.editScreenOnChange} onClick={this.editScreenOnSubmit} error ={error}/>

             
                 </div>
              );
              
          }
          return (
              <div>
               <EditButton onClick = {()=>{this.displayEditScreen(true)}}/>
               <div style={{width:'auto'}}>{userName}</div>
              </div>
            );
      }
}
UserName.propTypes ={
    userName: PropTypes.string.isRequired,
    changeUserName: PropTypes.func.isRequired,

  }
export default withFirebase(UserName);
    