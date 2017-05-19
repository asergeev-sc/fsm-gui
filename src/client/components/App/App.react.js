import React, { Component, PropTypes } from 'react';
import './App.less';
import createStore from './redux/create';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import ApiClient from './redux/ApiClient';

import ToolbarContainer from '../ToolbarContainer';
import ViewportContainer from '../ViewportContainer';
import StatusLineContainer from '../StatusLineContainer';
import InspectorContainer from '../InspectorContainer';
import HelpContainer from '../HelpContainer';

import * as viewportActions from '../App/redux/reducer/viewport';
import * as layoutActions from '../App/redux/reducer/layout';
import * as fsmActions from '../App/redux/reducer/fsm';

const client = new ApiClient();
const store = createStore(client);
window.__FSM_REDUX_STORE__ = store;

const propTypes = {

};

const defaultProps = {

};

@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({
      ...viewportActions,
      ...layoutActions,
      ...fsmActions
    }, dispatch) })
)
class AppLayout extends Component {
  componentDidMount() {
    this.props.actions.loadFsm('workflow1');
  }

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
        <div>
          <HelpContainer />
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
