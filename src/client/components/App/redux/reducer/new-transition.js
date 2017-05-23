import { createTransition, deleteTransition } from './transitions';

const START_CREATE_NEW_TRANSITION = 'fsm/new-transition/START_CREATE_NEW_TRANSITION';
const FINISH_CREATE_NEW_TRANSITION = 'fsm/new-transition/FINISH_CREATE_NEW_TRANSITION';

const initialState = {
  creationStarted: false,
  lastCreated: ''
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const transitionKeyPrefix = 'transition_';
const transitionTemplate = {
  "name": "Transition 1",
  "description": "Transition 1 description",
  "from": "new",
  "to": "onHold",
  "options": {
    "properties": {

    },
    "triggers": {

    },
    "conditions": {

    },
    "validators": {

    },
    "postFunctions": {

    }
  },
  "points": [20,20, 20,100, 40,100, 100,40]
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_CREATE_NEW_TRANSITION:
      return Object.assign({}, state, { creationStarted: true, lastCreated: action.lastCreated });
    case FINISH_CREATE_NEW_TRANSITION:
      return Object.assign({}, state, { creationStarted: false });
    default:
      return state;
  }
}

export function startCreateNewTransition(fromPoint) {
  const key = 'transition_' + Math.random();
  const name = capitalize(key).replace('_', '');
  const points = [
    fromPoint.x, fromPoint.y,
    fromPoint.x, fromPoint.y,
    fromPoint.x, fromPoint.y,
    fromPoint.x, fromPoint.y
  ];
  const value = Object.assign({}, transitionTemplate, { name, points });

  return dispatch => {
    dispatch({ type: START_CREATE_NEW_TRANSITION, lastCreated: key });
    dispatch(createTransition(key, value));
  };
}

export function finishCreateNewTransition() {
  return { type: FINISH_CREATE_NEW_TRANSITION };
}
