import { combineReducers } from 'redux';
import viewport from './viewport';
import layout from './layout';
import fsm from './fsm';

export default combineReducers({
  fsm,
  viewport,
  layout
});
