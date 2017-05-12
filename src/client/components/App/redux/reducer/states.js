import Immutable from 'immutable';

const CREATE_STATE = 'fsm/states/CREATE_STATE';
const UPDATE_STATE = 'fsm/states/UPDATE_STATE';
const DELETE_STATE = 'fsm/states/DELETE_STATE';

const initialState = Immutable.fromJS({
  items: {
    'State_1': {
      name: 'State_1',
      code: 0,
      view: {
        x: 20,
        y: 20,
        radius: 60
      }
    }
  }
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CURSOR_POSITION:
      return state.set('cursorPosition', action.cursorPosition);
    default:
      return state;
  }
}
