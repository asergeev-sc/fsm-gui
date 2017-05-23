import request from 'superagent';
import { normalize, schema } from 'normalizr';
import { replaceStateNodes } from './state-nodes';

const LOAD_FSM = 'fsm/fsm/LOAD_FSM';
const LOAD_FSM_SUCCESS = 'fsm/fsm/LOAD_FSM_SUCCESS';
const LOAD_FSM_FAIL = 'fsm/fsm/LOAD_FSM_FAIL';

const initialState = {
  "meta": {
    "name": "Sample name",
    "description": "Sample desc",
    "id": "Sample id",
    "parentId": null,
    "changedOn": "1495118748919",
    "changedBy": "admin"
  },
  "loading": false,
  "loaded": false,
  "error": false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FSM:
      return Object.assign({}, state, { 'loading': true});
    case LOAD_FSM_SUCCESS:
      return Object.assign({}, state, {
        'meta': Object.assign({}, action.value),
        'loading': false,
        'loaded': true,
        'error': null
      });
    case LOAD_FSM_FAIL:
      return Object.assign({}, state, {
        'loading': false,
        'loaded': false,
        'error': action.error
      });
      return { ...state, loading: false, loaded: false, error: action.error };
    default:
      return state;
  }
}

export function loadFsmSuccess(value) {
  return { type: LOAD_FSM_SUCCESS, value };
}

export function loadFsmFail(error) {
  return { type: LOAD_FSM_FAIL, error };
}

function testNormalizr(data) {
  // const originalData = {
  // "id": "123",
  // "author": {
  //   "id": "1",
  //   "name": "Paul"
  // },
  // "title": "My awesome blog post",
  // "comments": [
  //   {
  //     "id": "324",
  //     "commenter": {
  //       "id": "2",
  //       "name": "Nicole"
  //     }
  //   }
  // ]
  // };
  // Define a users schema
  // const user = new schema.Entity('users');

  // Define your comments schema
  // const comment = new schema.Entity('comments', {
  //   commenter: user
  // });

  // Define your article
  // const article = new schema.Entity('articles', {
  //   author: user,
  //   comments: [ comment ]
  // });
  const visual = new schema.Entity('visuals');
  const fsm = new schema.Entity('fsms', {
    visual
  });

  const normalizedData = normalize(data, fsm);
  console.log('normalized:', normalizedData);
}

export function loadFsm(id) {
  return dispatch =>
    request.get(`http://localhost:3020/machines/${id}`)
      .then((result) => {
        testNormalizr(result.body);
        dispatch(loadFsmSuccess(result.body.meta));
        dispatch(replaceStateNodes(result.body.data.states));
      })
      .catch((error) => {
        dispatch(loadFsmFail(error));
      });
}
