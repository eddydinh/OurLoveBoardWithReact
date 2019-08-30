import React, {
    Component
} from 'react'
import style from './LoadingScreen.css'
import PropTypes from 'prop-types';
export default class LoadingScreen extends Component{
  
    constructor(props){
      
        super(props);
        this.state = {
            
            text:'LOADING REQUEST'
        
        }
        
       
        this.addDotInterval = null;
        
        
        
    }
    componentDidMount(){
        this.AddDot();
    }
    componentWillUnmount(){
       clearInterval(this.addDotInterval);
    }
    render(){
       
 
            return(
            
            <div className={style.loaderDiv} >
                <div className={style.spinnerDiv}>
                    <div className={style.loader}></div>
                    <p>{this.state.text}</p>
                </div>

            </div>
            )
    
          
        
    }
    
    
    AddDot = () =>{
      let dots = 0;
      
    

      clearInterval(this.addDotInterval);

      this.addDotInterval = setInterval( () =>{
        if (dots < 3) {
            this.setState({text:this.state.text +="."});
            dots++;
        } else {

            this.setState({text:"LOADING REQUEST"});
            dots = 0;
        }
    }, 400);

  
        
    }
   
 
}

