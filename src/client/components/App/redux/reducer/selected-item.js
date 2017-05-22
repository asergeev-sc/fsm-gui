const UPDATE_SELECTED_ITEM = 'fsm/slectedItem/UPDATE_SELECTED_ITEM';
const UPDATE_HOVERED_STATE_NODE = 'fsm/slectedItem/UPDATE_HOVERED_STATE_NODE';

export const ITEM_TYPES = {
  STATE: 'fsm/types/STATE',
  TRANSITION: 'fsm/types/TRANSITION',
  VIEWPORT: 'fsm/types/VIEWPORT',
  NON_INSPECTABLE: 'fsm/types/NON_INSPECTABLE'
};

const initialState = {
  type: ITEM_TYPES.NON_INSPECTABLE,
  id: null,
  hoveredStateNode: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SELECTED_ITEM:
      return Object.assign({}, state, { itemType: action.itemType, itemId: action.itemId });
    case UPDATE_HOVERED_STATE_NODE:
      return Object.assign({}, state, { hoveredStateNode: action.value });
    default:
      return state;
  }
}

export function updateSelectedItem(itemType, itemId = null) {
  return { type: UPDATE_SELECTED_ITEM, itemType, itemId };
}

export function updateHoveredStateNode(value) {
  return { type: UPDATE_HOVERED_STATE_NODE, value };
}
