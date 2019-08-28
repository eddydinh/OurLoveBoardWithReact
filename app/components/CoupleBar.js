import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './CoupleBar.css';
import AddPartnerButton from './AddPartnerButton';
import * as TodoActions from '../actions/actions';
import UserName from './UserName';
@connect(
  state => ({
    reducers: state.reducers
    
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class CoupleBar extends Component {
    
   
    
      render() {
       const {reducers,actions} = this.props;
 
          return (
              <div>
              <table className={style.coupleBar}>
 <tbody>
  <tr>
    <th><UserName name = {reducers.userName} changeUserName={actions.changeUserName}/></th>
    <th><AddPartnerButton/></th> 
  </tr>
              
</tbody>
 
</table>
              </div>
            );
      }
}
CoupleBar.propTypes ={
  

  }
    