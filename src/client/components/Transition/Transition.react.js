import React, { Component, PropTypes } from 'react';
import './Transition.less';

export default
class Transition extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="transition">
      </div>
    );
  }
}

Transition.propTypes = {
};
Transition.defaultProps = {
};
