import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  tab:"Login",
};

const actionsMap = {
  [ActionTypes.CHANGE_TAB](state, action) {
    return  Object.assign({}, state, { tab: action.tabName }) 
  },
}
export default function reducers(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}