import React, { Component} from 'react';
import PropTypes from 'prop-types';
import style from './PartnerName.css';
import AddPartnerButton from './AddPartnerButton';
import EditScreen from './EditScreen';
import { withFirebase } from '../components/Firebase';
import * as StatusConstants from '../constants/StatusConstants.js'


const INITIAL_STATE ={
    isEditScreenOpen: false,
    editScreenValue: '',
    error:null,
    users:[],
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
    
    isInvalidEmailAddress = s=>{
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return !re.test(String(s).toLowerCase());
    }
    
   
      render() {
          
    
        
        const {status} = this.props;
       
          
        
            if(status && status.status === StatusConstants.HAS_PARTNER){
                return (<div>{`Has ${status.value} as partner`}</div>)
            }
            else if (status && status.status === StatusConstants.HAS_REQUEST){
                return(<div>{`Has ${status.value} as request`}</div>)
            }
                  
                 
            else if (status && status.status === StatusConstants.IS_PENDING){
                return(<div>{`Has ${status.value} as pending`}</div>)
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
    