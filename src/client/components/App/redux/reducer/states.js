const CREATE_STATE = 'fsm/states/CREATE_STATE';
const UPDATE_STATE = 'fsm/states/UPDATE_STATE';
const DELETE_STATE = 'fsm/states/DELETE_STATE';

const initialState = {
  items: {
    'State_1': {
      name: 'State_1',
      code: 0,
      x: 20,
      y: 20,
      radius: 60
    }
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_STATE:
      return state;
    default:
      return state;
  }
}
