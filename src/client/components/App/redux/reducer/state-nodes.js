const CREATE_STATE_NODE = 'fsm/state-nodes/CREATE_STATE_NODE';
const UPDATE_STATE_NODE = 'fsm/state-nodes/UPDATE_STATE_NODE';
const DELETE_STATE_NODE = 'fsm/state-nodes/DELETE_STATE_NODE';
const REPLACE_STATE_NODES = 'fsm/state-nodes/REPLACE_STATE_NODES';

const initialState = {
  'State_1': {
    name: 'State_1',
    code: 0,
    x: 20,
    y: 20,
    radius: 60
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_STATE_NODE:
      return state;
    case UPDATE_STATE_NODE:
      return state;
    case DELETE_STATE_NODE:
      return state;
    case REPLACE_STATE_NODES:
      return action.value;
    default:
      return state;
  }
}

export function replaceStateNodes(value) {
  console.log('rb:::', value);
  return { type: REPLACE_STATE_NODES, value };
}
