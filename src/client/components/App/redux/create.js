import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import reducer from './reducer';

export default function createStore(data) {
  const middleware = [thunk];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = _createStore(
    reducer,
    data || undefined,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}
