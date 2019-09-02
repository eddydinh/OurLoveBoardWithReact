import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/actions';
import { withFirebase } from '../components/Firebase';
import SignOutButton from './SignOut';
import CoupleBar from './CoupleBar';
import ButtonArray from './ButtonArray';
import CanvasDraw from "react-canvas-draw";



@connect(
  state => ({
    reducers: state.reducers
    
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
class HomePage extends Component {
       
      
      onColorChange = event=>{
         const{actions} = this.props;
         actions.changeBrushColor(event.target.value);
          
          event.preventDefault();
}
      
      onBrushSizeChange = event=>{
           const{actions} = this.props;
         actions.changeBrushSize(event.target.value);
        
          event.preventDefault();
}
      
      onClear = ()=>{
          const{thisCanvas} = this;
          if(thisCanvas){
              thisCanvas.clear();
               
          }
      }
      
      onUndo = () =>{
            const{thisCanvas} = this;
          if(thisCanvas){
              thisCanvas.undo();
              
          }
      }
     loadCurrentCanvasToDb = () =>{
       const {reducers,firebase} = this.props;
       const yourId = reducers.authUser.uid;
       const partnerId = reducers.status.value;
       const canvasData = this.thisCanvas.getSaveData();
      
        firebase
                          .user(partnerId)
                          .update({
                                canvasData: canvasData
                          }, (error)=>{
                                if (error) {
                                    console.log(error);
                                } else {
                                     firebase
                                         .user(yourId)
                                         .update({
                                             canvasData: canvasData
                                         }, (error) => {
                                             if (error) {
                                                console.log(error);
                                             }
                                         });
                                }
        });
      
  
      }
      render() {
           
       const {status,reducers} = this.props;
  
          return (
              <div>
            <CoupleBar/>
              
              
            {status && status == "hasPartner" && <div> <CanvasDraw ref={canvasDraw =>{this.thisCanvas = canvasDraw}} saveData={reducers.canvasData} canvasHeight="300px" canvasWidth="100%" brushColor={reducers.brushColor}  brushRadius={parseInt(reducers.brushSize)} hideGrid={true}/> </div> }
            
              
              {<ButtonArray onSave = {this.loadCurrentCanvasToDb} onUndo={this.onUndo} onClear={this.onClear} status={status} brushColor={reducers.brushColor} brushSize={parseInt(reducers.brushSize)} onColorChange={this.onColorChange} onBrushSizeChange={this.onBrushSizeChange}/>}
           
          
          </div>);
      }
}
export default withFirebase(HomePage);