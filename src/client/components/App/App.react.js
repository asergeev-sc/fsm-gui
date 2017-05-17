import React, { Component, PropTypes } from 'react';
import createStore from './redux/create';
import { Provider } from 'react-redux';
import ToolbarContainer from '../ToolbarContainer';
import ViewportContainer from '../ViewportContainer';
import StatusLineContainer from '../StatusLineContainer';
import InspectorContainer from '../InspectorContainer';
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
          <div>
            <ToolbarContainer />
          </div>
          <div className="fsm--app__middle-container">
            <InspectorContainer />
            <ViewportContainer />
          </div>
          <div>
            <StatusLineContainer />
          </div>
        </div>
      </Provider>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
