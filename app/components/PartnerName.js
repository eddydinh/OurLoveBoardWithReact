import React, { Component} from 'react';
import PropTypes from 'prop-types';
import AddPartnerButton from './AddPartnerButton';
import EditScreen from './EditScreen';
import { withFirebase } from '../components/Firebase';
import * as StatusConstants from '../constants/StatusConstants.js';
import HasPartnerScreen from './HasPartnerScreen.js';
import MessageScreen from './MessageScreen.js';

const INITIAL_STATE ={
    isEditScreenOpen: false,
    editScreenValue: '',
    error:null,
    users:[],
    isBreakupScreenOpen:false,
}
class PartnerName extends Component {
    constructor(props){
        super(props);
         this.state = { ...INITIAL_STATE};
    }
    
    

    
     currentUserEmail = ()=>{
         const {authUser} = this.props;
         return authUser.email;
        
    }
     
     currentUserId = () =>{
         const{authUser} = this.props;
         return authUser.uid;
     }
    
    
    
    displayEditScreen(isOpen){
          this.setState({  isEditScreenOpen: isOpen});
        
    }
    
    displayError(error){
        const{changeIsLoading} = this.props;
        changeIsLoading(false);
        this.setState({error:error});
        
    }
    
    checkAvailableStatus = requestUId  =>{
        const currentId = this.currentUserId();
        const {firebase} = this.props;
        return firebase.user(requestUId).once('value').then(snapshot => {
            const hasSomeoneElse= (snapshot.val() && snapshot.val().hasPartner) ||(snapshot.val() && snapshot.val().isPending) || (snapshot.val() && snapshot.val().hasRequest) ;
            
            
            if(!hasSomeoneElse){
                this.setRequest(currentId, requestUId);
            }else{
              this.displayError({ message:'Your partner already has someone else, please try again another time'});  
            }
        }).catch(error=>{
            this.displayError(error);
        });
        
        
    }
    
    setRequest = (yourId, partnerId) =>{
        const {firebase} = this.props;
        firebase.user(partnerId).update({
                              hasRequest:yourId
                          }, (error)=>{
                                if (error) {
                                   this.displayError(error);
                                } else {
                                    this.setPending(yourId, partnerId); 
                                }
        });
    }
    
    setPending = (yourId, partnerId) =>{
        const {firebase,authUser} = this.props;
         firebase.user(yourId).update({
                              isPending:partnerId
                          }, (error)=>{
                                if (error) {
                                    this.displayError(error);
                                }else{
                                    const {changeIsLoading} = this.props;
                                    changeIsLoading(false);
                                    this.setState({isEditScreenOpen:false});
                                } 
        });
    }
    editScreenOnSubmit = event =>{
        const {editScreenValue} = this.state;
        const {firebase,changeIsLoading} = this.props;
        this.setState({error:null});
        changeIsLoading(true);
        firebase.users().once('value').then( snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,

            })
                    
            const {users} = this.state;
            let userFound = false;
            for(let i=0; i < users.length; i++){
           
                if (users[i].email == editScreenValue){
                    this. checkAvailableStatus (users[i].uid);
                    userFound = true;
                    break;
                }
                    
            }
            if(!userFound){
            this.displayError({ message:'Your partner doesn\'t exist'})
            }
            
          
       
            
            
        }).catch(error=>{
            this.state({error:error});
        });
        
        
       
      
        
    }
    
    editScreenOnChange = event =>{
        this.setState({  editScreenValue: event.target.value});
    }
    
      editScreenOnClose = () =>{
        this.setState({...INITIAL_STATE});
         
    }
    
    isInvalidEmailAddress = s =>{
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return !re.test(String(s).toLowerCase());
    }
    
    
    
   openBreakupScreen = () =>{
       this.setState({isBreakupScreenOpen: true});
   }
   
   closeBreakupScreen = () =>{
       this.setState({isBreakupScreenOpen: false});
   }
    
   youAreAlone = (partnerId) => {
       const{authUser,firebase} = this.props;
        firebase
                          .user(authUser.uid)
                          .update({
                              hasPartner:null,
                              isPending:null,
                              hasRequest:null,
                          }, (error)=>{
                                if (error) {
                                    console.log(error);
                                } else {
                                     firebase
                                         .user(partnerId)
                                         .update({
                                             hasPartner: null,
                                             isPending: null,
                                             hasRequest: null,
                                         }, (error) => {
                                             if (error) {
                                                console.log(error);
                                             } else {
                                                this.closeBreakupScreen();
                                             }
                                         });
                                }
        });
     
   }
   
      
   youAreTaken = (partnerId) => {
       const{authUser,firebase} = this.props;
        firebase
                          .user(partnerId)
                          .update({
                              hasPartner:authUser.uid,
                              isPending:null,
                              hasRequest:null
                          }, (error)=>{
                                if (error) {
                                    console.log(error);
                                } else {
                                     firebase
                                         .user(authUser.uid)
                                         .update({
                                             hasPartner: partnerId,
                                             isPending:null,
                                             hasRequest:null
                                         }, (error) => {
                                             if (error) {
                                                console.log(error);
                                             } else {
                                                this.closeBreakupScreen();
                                             }
                                         });
                                }
        });
     
   }

      render() {
          
    
        
        const {status} = this.props;
       
          
        
            if(status && status.status === StatusConstants.HAS_PARTNER){
                const {isBreakupScreenOpen} = this.state;
                if(isBreakupScreenOpen){
                   const partnerId = status.value;
                                                           
                   return(<MessageScreen yesFunction ={()=>{this.youAreAlone(partnerId);}} noFunction = {()=>{this.closeBreakupScreen();}} headerText ={`Are you sure you want to break up with your current partner?`}/>);
                }else{
                    const {partnerName} = this.props;
                  
                    return(<HasPartnerScreen onBreakup={()=>{this.openBreakupScreen();}} partnerName={partnerName}/>);
                  
                    
                     
                    
                }
               
            }
            else if (status && status.status === StatusConstants.HAS_REQUEST){
              const partnerId = status.value;
                 
                return(<MessageScreen yesFunction ={()=>{this.youAreTaken(partnerId)}} noFunction = {()=>{this.youAreAlone(partnerId)}} headerText={`${this.props.partnerName} has sent you a request. Do you want to be his/her partner?`}/>)  
                
                
            }
                  
                 
            else if (status && status.status === StatusConstants.IS_PENDING){
                  const {isBreakupScreenOpen} = this.state;
                if(isBreakupScreenOpen){
                    const partnerId = status.value;
                    return(<MessageScreen noFunction = {()=>{this.closeBreakupScreen()}} yesFunction={()=>{this.youAreAlone(partnerId)}} headerText={'Are you sure?'}/>)
                }else{
                  
                return(<MessageScreen noFunction = {()=>{this.openBreakupScreen()}} noText={`CANCEL`} headerText={`A request has been sent to ${this.props.partnerName}. Once he/she has accepted, his/her name will appear here. Do you wish to cancel your request?`}/>)  
                }
            }
                
             else {
                   return (

                        <div>
                            {this.RenderAddScreen()}
        
                        </div>
            
                    );
             }
          }    

      

    RenderAddScreen = () =>{
        const {isEditScreenOpen,editScreenValue,error} = this.state;
        const isInvalid = editScreenValue == ''|| this.isInvalidEmailAddress(editScreenValue)|| (editScreenValue == this.currentUserEmail());
                  if(isEditScreenOpen){
              return(
                <div>
                <EditScreen onClose ={()=>{this.editScreenOnClose();}} maxLength ={50} isInvalid={isInvalid} inputValue={editScreenValue} headerText={"Add partner by typing in his/her email & submit"} onChange={this.editScreenOnChange} onClick={this.editScreenOnSubmit} error={error}/>

                
                 </div>
              );
              
          }
          return (
              <div>
               <AddPartnerButton onClick = {()=>{this.displayEditScreen(true)}}/>
         
              </div>
            );
    }
}
PartnerName.propTypes ={
    changeIsLoading: PropTypes.func.isRequired,
    

  }
export default withFirebase(PartnerName);
    