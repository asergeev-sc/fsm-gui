const UPDATE_SELECTED_ITEM = 'fsm/app/UPDATE_SELECTED_ITEM';

const ITEM_TYPES = {
  STATE: 'fsm/types/STATE',
  TRANSITION: 'fsm/types/TRANSITION',
  VIEWPORT: 'fsm/types/VIEWPORT',
  NON_INSPECTABLE: 'fsm/types/NON_INSPECTABLE'
};

const initialState = {
  itemType: ITEM_TYPES.NON_INSPECTABLE,
  itemId: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SELECTED_ITEM:
      return Object.assign({}, state, { 'itemType': action.itemType, itemId: action.itemId });
    default:
      return state;
  }
}

export function updateSelectedItem(itemType, itemId = null) {
  return { type: UPDATE_SELECTED_ITEM, itemType, itemId };
}
