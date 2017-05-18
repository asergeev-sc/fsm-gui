const UPDATE_APP_ELEMENT_REF = 'fsm/layout/UPDATE_APP_ELEMENT_REF';
const UPDATE_SHOW_INSPECTOR = 'fsm/layout/UPDATE_SHOW_INSPECTOR';
const UPDATE_SHOW_HELP = 'fsm/layout/UPDATE_SHOW_HELP';

const initialState = {
  appElementRef: null,
  showInspector: true,
  showHelp: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_APP_ELEMENT_REF:
      return Object.assign({}, state, { 'appElementRef': action.value });
    case UPDATE_SHOW_INSPECTOR:
      return Object.assign({}, state, { 'showInspector': action.value });
    case UPDATE_SHOW_HELP:
      return Object.assign({}, state, { 'showHelp': action.value });
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

export function updateShowHelp(value) {
  return { type: UPDATE_SHOW_HELP, value };
}
