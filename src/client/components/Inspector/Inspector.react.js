import React, { Component, PropTypes } from 'react';
import TransitionInspector from '../TransitionInspector';
import './Inspector.less';

const propTypes = {};
const defaultProps = {};

export default
class Inspector extends Component {
  render() {
    return (
      <div className="fsm--inspector">
        <div></div>
        <TransitionInspector />
      </div>
    );
  }
}

Inspector.propTypes = propTypes;
Inspector.defaultProps = defaultProps;
