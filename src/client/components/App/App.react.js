import React, { Component, PropTypes } from 'react';
import createStore from './redux/create';
import { Provider } from 'react-redux';
import ViewportContainer from '../ViewportContainer';
import StatusLineContainer from '../StatusLineContainer';
import './App.less';

const store = createStore();
window.__FSM_REDUX_STORE__ = store;

const propTypes = {

};

const defaultProps = {

};

export default
class App extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <div className="fsm--app">
          <ViewportContainer />
          <StatusLineContainer />
        </div>
      </Provider>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
