import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainLogin from '../components/MainLogin';
import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
  state => ({
    todos: state.todos,
    reducers: state.reducers
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    reducers: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { todos, actions,reducers} = this.props;
   console.log(this.props)
    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <MainLogin changeTab = {actions.changeTab} currentTabName = {reducers.tab}/>
      </div>
    );
  }
}
