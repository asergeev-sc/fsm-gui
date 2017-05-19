/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';
import { Provider } from 'react-redux';


@showroomScopeDecorator
export default
class ViewportContainerScope extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={window.__FSM_REDUX_STORE__} key="provider">
        <div>
          {this._renderChildren()}
        </div>
      </Provider>
    );
  }
}

ViewportContainerScope.contextTypes = {
  i18n: PropTypes.object
};
ViewportContainerScope.childContextTypes = {
  i18n: PropTypes.object
};
