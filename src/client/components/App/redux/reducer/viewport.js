import Immutable from 'immutable';

const UPDATE_CURSOR_POSITION = 'fsm/viewport/UPDATE_CURSOR_POSITION';
const UPDATE_VIEWPORT_RECT = 'fsm/viewport/UPDATE_VIEWPORT_RECT';
const UPDATE_VIEWPORT_SCALE = 'fsm/viewport/UPDATE_VIEWPORT_SCALE';

const initialState = Immutable.fromJS({
  cursorPosition: {},
  viewportRect: {},
  viewportScale: 1
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CURSOR_POSITION:
      return state.set('cursorPosition', action.value);
    case UPDATE_VIEWPORT_RECT:
      return state.set('viewportRect', action.value);
    case UPDATE_VIEWPORT_SCALE:
      return state.set('viewportScale', action.value);
    default:
      return state;
  }
}
