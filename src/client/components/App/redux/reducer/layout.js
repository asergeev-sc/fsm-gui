const UPDATE_APP_ELEMENT_REF = 'fsm/layout/UPDATE_APP_ELEMENT_REF';
const UPDATE_SHOW_INSPECTOR = 'fsm/layout/UPDATE_SHOW_INSPECTOR';

const initialState = {
  appElementRef: null,
  showInspector: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_APP_ELEMENT_REF:
      return Object.assign({}, state, { 'appElementRef': action.value });
    case UPDATE_SHOW_INSPECTOR:
      return Object.assign({}, state, { 'showInspector': action.value });
    default:
      return state;
  }
}

export function updateAppElementRef(value) {
  return { type: UPDATE_APP_ELEMENT_REF, value };
}

export function updateShowInspector(value) {
  return { type: UPDATE_SHOW_INSPECTOR, value };
}
