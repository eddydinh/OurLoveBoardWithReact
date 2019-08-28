import * as types from '../constants/ActionTypes';

export function changeTab(tabName) {
  return { type: types.CHANGE_TAB, tabName };
}

export function changeAuth(authUser) {
  return { type: types.CHANGE_AUTH, authUser};
}

export function changeIsForgotPassword(isForgotPassword) {
  return { type: types.IS_FP, isForgotPassword};
}

export function changeUserName(userName) {
  return { type: types.CHANGE_USER_NAME, userName};
}





