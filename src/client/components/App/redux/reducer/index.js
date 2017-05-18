import { combineReducers } from 'redux';
import viewport from './viewport';
import layout from './layout';
import fsm from './fsm';
import states from './states';

export default combineReducers({
  fsm,
  viewport,
  layout,
  states
});
