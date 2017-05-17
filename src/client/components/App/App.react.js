import React, { Component, PropTypes } from 'react';
import createStore from './redux/create';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import ToolbarContainer from '../ToolbarContainer';
import ViewportContainer from '../ViewportContainer';
import StatusLineContainer from '../StatusLineContainer';
import InspectorContainer from '../InspectorContainer';
import './App.less';

import * as viewportActions from '../App/redux/reducer/viewport';
import * as layoutActions from '../App/redux/reducer/layout';

const store = createStore();
window.__FSM_REDUX_STORE__ = store;

const propTypes = {

};

const defaultProps = {

};

@connect(
  state => ({}),
  dispatch => ({ actions: bindActionCreators({ ...viewportActions, ...layoutActions }, dispatch) })
)
class AppLayout extends Component {
  handleAppRef(ref) {
    this.props.actions.updateAppElementRef(ref);
  }

  render() {
    return (
      <div className="fsm--app" ref={this.handleAppRef.bind(this)}>
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
    );
  }
}

export default
class App extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <AppLayout />
      </Provider>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
