const CREATE_TRANSITION = 'fsm/transitions/CREATE_TRANSITION';
const UPDATE_TRANSITION = 'fsm/transitions/UPDATE_TRANSITION';
const DELETE_TRANSITION = 'fsm/transitions/DELETE_TRANSITION';
const REPLACE_TRANSITIONS = 'fsm/state-nodes/REPLACE_TRANSITIONS';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_TRANSITION:
      return Object.assign({}, state, { [action.key]: action.value });
    case UPDATE_TRANSITION:
      const transition = Object.assign({}, state[action.key], action.value);
      return Object.assign({}, state, { [action.key]: transition });
    case DELETE_TRANSITION:
      const newState = Object.assign({}, state, { [action.key]: undefined });;
      delete newState[action.key];
      return newState;
    case REPLACE_TRANSITIONS:
      return action.value;
    default:
      return state;
  }
}

export function createTransition(key, value) {
  return { type: CREATE_TRANSITION, key, value };
}

export function updateTransition(key, value) {
  return { type: UPDATE_TRANSITION, key, value };
}

export function deleteTransition(key) {
  return { type: DELETE_TRANSITION, key };
}

export function replaceTransitions(value) {
  return { type: REPLACE_TRANSITIONS, value };
}
