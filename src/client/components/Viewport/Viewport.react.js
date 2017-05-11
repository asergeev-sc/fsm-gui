import React, { Component, PropTypes } from 'react';
import './Viewport.less';

export default
class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="viewport">
      </div>
    );
  }
}

Viewport.propTypes = {
};
Viewport.defaultProps = {
};
