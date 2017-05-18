const LOAD_FSM = 'fsm/fsm/LOAD_FSM';
const LOAD_FSM_SUCCESS = 'fsm/fsm/LOAD_FSM_SUCCESS';
const LOAD_FSM_FAIL = 'fsm/fsm/LOAD_FSM_FAIL';

const initialState = {
  "name": "Sample name",
  "description": "Sample desc",
  "id": "Sample id",
  "parentId": null,
  "changedOn": "1495118748919",
  "changedBy": "admin",
  "loading": false,
  "loaded": false,
  "error": false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FSM:
      return { ...state, loading: true };
    case LOAD_FSM_SUCCESS:
      return { ...action.result, loading: false, loaded: true, error: null };
    case LOAD_FSM_FAIL:
      return { ...state, loading: false, loaded: false, error: action.error };
    default:
      return state;
  }
}

export function loadFsm(id) {
  return {
    types: [LOAD_FSM, LOAD_FSM_SUCCESS, LOAD_FSM_FAIL],
    id: id,
    promise: client => client.get(`/workflows/${id}`)
  };
}
