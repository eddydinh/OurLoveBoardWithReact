import { combineReducers } from 'redux';
import todos from './todos';
import reducers from './reducers';
export default combineReducers({
  todos, reducers
});
