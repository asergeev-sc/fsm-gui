import Immutable from 'immutable';

const UPDATE_CURSOR_POSITION = 'fsm/viewport/UPDATE_CURSOR_POSITION';
const UPDATE_VIEWPORT_POSITION = 'fsm/viewport/UPDATE_VIEWPORT_POSITION';
const UPDATE_VIEWPORT_SIZE = 'fsm/viewport/UPDATE_VIEWPORT_SIZE';

const initialState = Immutable.fromJS({
  cursorPosition: [],
  viewportPosition: [0, 0],
  viewportSize: [400, 400]
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CURSOR_POSITION:
      return state.set('cursorPosition', action.cursorPosition);
    default:
      return state;
  }
}
