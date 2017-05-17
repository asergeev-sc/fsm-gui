import React, { Component, PropTypes } from 'react';
import TransitionInspector from '../TransitionInspector';
import './Inspector.less';

export default
class Inspector extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="inspector">
        <TransitionInspector />
      </div>
    );
  }
}

Inspector.propTypes = {
};
Inspector.defaultProps = {
};
