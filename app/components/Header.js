import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };

  render() {
    
   
    return (
      <div style={{background:'#FFB9B7',height: 100 + 'px'}}>
        <h1>our love board</h1>
        
      </div>
    );
  }
}
