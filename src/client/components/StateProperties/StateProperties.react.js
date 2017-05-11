import React, { Component, PropTypes } from 'react';
import './StateProperties.less';

export default
class StateProperties extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="state-properties">
      </div>
    );
  }
}

StateProperties.propTypes = {
};
StateProperties.defaultProps = {
};
