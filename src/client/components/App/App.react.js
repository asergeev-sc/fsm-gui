import React, { Component, PropTypes } from 'react';
import createStore from './redux/create';
import { Provider } from 'react-redux';
import './App.less';

const store = createStore();

const propTypes = {

};

const defaultProps = {

};

export default
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <Provider store={store} key="provider">
        <div className="fsm--app">
        </div>
      </Provider>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
