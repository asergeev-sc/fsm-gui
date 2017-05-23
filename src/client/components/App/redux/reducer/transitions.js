const CREATE_TRANSITION = 'fsm/transitions/CREATE_TRANSITION';
const UPDATE_TRANSITION = 'fsm/transitions/UPDATE_TRANSITION';
const DELETE_TRANSITION = 'fsm/transitions/DELETE_TRANSITION';
const REPLACE_TRANSITIONS = 'fsm/state-nodes/REPLACE_TRANSITIONS';

const initialState = {

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_TRANSITION:
      return state;
    case UPDATE_TRANSITION:
      return Object.assign({}, state, { [action.key]: action.value });
    case DELETE_TRANSITION:
      return state;
    case REPLACE_TRANSITIONS:
      return action.value;
    default:
      return state;
  }
}

export function updateTransition(key, value) {
  return { type: UPDATE_TRANSITION, key, value };
}

export function replaceTransitions(value) {
  return { type: REPLACE_TRANSITIONS, value };
}
