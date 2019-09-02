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
     ,
  [ActionTypes.IS_LOADING](state, action) {
    return  Object.assign({}, state, { isLoading: action.isLoading }) 
}
   ,
  [ActionTypes.CHANGE_STATUS](state, action) {
    return  Object.assign({}, state, { status: action.status }) 
}
      ,
  [ActionTypes.CHANGE_PARTNERNAME](state, action) {
    return  Object.assign({}, state, { partnerName: action.partnerName }) 
}
    
     ,
  [ActionTypes.CHANGE_CANVASDATA](state, action) {
    return  Object.assign({}, state, {canvasData: action.canvasData }) 
}
     
     ,
  [ActionTypes.CHANGE_BRUSHCOLOR](state, action) {
    return  Object.assign({}, state, {brushColor: action.brushColor}) 
}
     
     ,
  [ActionTypes.CHANGE_BRUSHSIZE](state, action) {
    return  Object.assign({}, state, {brushSize: action.brushSize }) 
}
}
export default function reducers(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  
  if (!reduceFn) return state;
  return reduceFn(state, action);
}