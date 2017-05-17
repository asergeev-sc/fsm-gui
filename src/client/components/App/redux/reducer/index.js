import { combineReducers } from 'redux';
import viewport from './viewport';
import layout from './layout';

export default combineReducers({
  viewport,
  layout
});
