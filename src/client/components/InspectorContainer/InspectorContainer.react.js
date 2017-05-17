import React, { Component, PropTypes } from 'react';
import Inspector from '../Inspector';
import './InspectorContainer.less';

const propTypes = {};
const defaultProps = {};

export default
class InspectorContainer extends Component {
  render() {
    return (
      <div className="fsm--inspector-container">
        <Inspector />
      </div>
    );
  }
}

InspectorContainer.propTypes = propTypes;
InspectorContainer.defaultProps = defaultProps;
