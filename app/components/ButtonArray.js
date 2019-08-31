import React, { Component} from 'react';
import PropTypes from 'prop-types';
import SignOutButton from './SignOut';
import style from './ButtonArray.css';

export default class ButtonArray extends Component {
      
 
      render() {
           
       const {onColorChange,onBrushSizeChange,brushSize,color,status,onClear,onUndo} = this.props;
         
          return (
              <div className={style.ButtonArray}>
                               <SignOutButton/>
              {status && status == "hasPartner" && <div>
              <input onChange={onColorChange} className={style.canvasInput} type="color" value={color}/>
              
              <div className={style.canvasInput}>  <input onChange={onBrushSizeChange} className={style.slider} type={"range"} min={"1"} max={"100"} value={brushSize}  />
              </div>
              
              <div onClick={onUndo} className={style.refreshIconContainer}>
               <div className={style.refreshIcon}></div>

              </div>
              
              <div onClick={onClear} className={style.trashContainer}>
                  
                  <div className={style.trashIcon}></div>

              </div>
             
            
            
            </div>}
          
           
          
          </div>);
      }
}

ButtonArray.propTypes = {
    onColorChange: PropTypes.func.isRequired,
    onBrushSizeChange: PropTypes.func.isRequired,
    brushSize: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    onClear: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,

}