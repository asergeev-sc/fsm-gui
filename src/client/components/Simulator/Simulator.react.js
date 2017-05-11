import React, { Component, PropTypes } from 'react';
import './Simulator.less';

export default
class Simulator extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="simulator">
      </div>
    );
  }
}

Simulator.propTypes = {
};
Simulator.defaultProps = {
};
