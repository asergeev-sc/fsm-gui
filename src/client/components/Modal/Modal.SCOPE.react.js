/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';


@showroomScopeDecorator
export default
class ModalScope extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

ModalScope.contextTypes = {
  i18n: PropTypes.object
};
ModalScope.childContextTypes = {
  i18n: PropTypes.object
};
