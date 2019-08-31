import React, { Component} from 'react';
import PropTypes from 'prop-types';
import SignOutButton from './SignOut';
import CoupleBar from './CoupleBar';
import ButtonArray from './ButtonArray';
import CanvasDraw from "react-canvas-draw";

const INITIAL_STATE ={
    color: '#FF7964',
    brushSize: 5,
 
}

export default class HomePage extends Component {
       constructor(props){
      
        super(props);
        this.state = INITIAL_STATE
        
      
        
        
        
    }
      
      onColorChange = event=>{
          this.setState({color:event.target.value});
        
          event.preventDefault;
}
      
      onBrushSizeChange = event=>{
          this.setState({brushSize:event.target.value});
        
          event.preventDefault;
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
      render() {
           
       const {status} = this.props;
  
          return (
              <div>
            <CoupleBar/>
              
            {status && status == "hasPartner" && <CanvasDraw ref={canvasDraw =>{this.thisCanvas = canvasDraw}} canvasHeight="300px" canvasWidth="100%" brushColor={this.state.color}  brushRadius={this.state.brushSize} hideGrid={true}/> }
              
              {<ButtonArray onUndo={this.onUndo} onClear={this.onClear} status={status} color={this.state.color} brushSize={this.state.brushSize} onColorChange={this.onColorChange} onBrushSizeChange={this.onBrushSizeChange}/>}
           
          
          </div>);
      }
}
