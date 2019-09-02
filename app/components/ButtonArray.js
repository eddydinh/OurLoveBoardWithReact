import React, { Component} from 'react';
import PropTypes from 'prop-types';
import SignOutButton from './SignOut';
import style from './ButtonArray.css';

export default class ButtonArray extends Component {
      
 
      render() {
           
       const {onColorChange,onBrushSizeChange,brushSize,brushColor,status,onClear,onUndo,onSave} = this.props;
         
          return (
              <div className={style.ButtonArray}>
                               <SignOutButton/>
              {status && status == "hasPartner" && <div>
              <div className={[style.canvasInput,style.tooltip].join(' ')}> <input onChange={onColorChange} className={style.canvasColorPicker}  type="color" value={brushColor}/> <span className={style.tooltiptext}>{`Brush color: ${brushColor}`}</span></div>
             
              
              <div className={[style.canvasInput, style.tooltip].join(' ')}>  <input onChange={onBrushSizeChange} className={style.slider} type={"range"} min={1} max={100} value={brushSize}  />
              <span className={[style.sliderTooltip, style.tooltiptext].join(' ')}>{`Brush size: ${brushSize}`}</span>
              </div>
              
              <div onClick={onUndo} className={[style.buttonContainer, style.tooltip].join(' ')}>
               <div className={style.refreshIcon}></div>
                      <span className={style.tooltiptext}>Undo</span>

              </div>
              
              <div onClick={onClear} className={[style.buttonContainer, style.tooltip].join(' ')}>
                  
                  <div className={style.trashIcon}></div>
                      <span className={style.tooltiptext}>Clear</span>

              </div>
              
                <div onClick={onSave} className={[style.buttonContainer, style.tooltip].join(' ')}>
                  
                  <div className={style.paperClipIcon}></div>
                  <span className={[style.saveTooltip, style.tooltiptext].join(' ')}>Save your canvas</span>

              </div>
              
              
             

             
            
            
            </div>}
          
           
          
          </div>);
      }
}

ButtonArray.propTypes = {
    onColorChange: PropTypes.func.isRequired,
    onBrushSizeChange: PropTypes.func.isRequired,
    brushSize: PropTypes.number.isRequired,
    brushColor: PropTypes.string.isRequired,
    onClear: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,

}