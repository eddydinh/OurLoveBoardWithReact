import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './CoupleBar.css';
import AddPartnerButton from './AddPartnerButton';
import * as TodoActions from '../actions/actions';
import UserName from './UserName';
import PartnerName from './PartnerName';
import LoadingScreen from './LoadingScreen';
@connect(
  state => ({
    reducers: state.reducers
    
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class CoupleBar extends Component {
//    componentDidMount(){
//        const {actions} = this.props;
//        actions.changeIsLoading(false);
//    }
//  
      render() {
       const {reducers,actions} = this.props;
 
   
          return (
              <div>
              <table className={style.coupleBar}>
 <tbody>
  <tr>
    <th><UserName userName = {reducers.userName} changeUserName={actions.changeUserName}/></th>
    <th>{reducers.isLoading && <LoadingScreen/>} <PartnerName status = {reducers.status} authUser = {reducers.authUser} changeIsLoading ={actions.changeIsLoading}/></th> 
  </tr>
              
</tbody>
 
</table>
              </div>
            );
      }
}
CoupleBar.propTypes ={
  

  }
    