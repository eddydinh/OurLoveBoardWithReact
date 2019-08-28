import * as ActionTypes from '../constants/ActionTypes';
import * as InitialState from '../constants/InitialState';

const initialState = InitialState.INIT_STATE;


const actionsMap = {
  [ActionTypes.CHANGE_TAB](state, action) {
    return  Object.assign({}, state, { tab: action.tabName }) 
  },
    
    [ActionTypes.CHANGE_AUTH](state, action) {
    return  Object.assign({}, state, { authUser: action.authUser }) 
},
  [ActionTypes.IS_FP](state, action) {
    return  Object.assign({}, state, { isForgotPassword: action.isForgotPassword }) 
}
    ,
  [ActionTypes.CHANGE_USER_NAME](state, action) {
    return  Object.assign({}, state, { userName: action.userName }) 
}
}
export default function reducers(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  
  if (!reduceFn) return state;
  return reduceFn(state, action);
}