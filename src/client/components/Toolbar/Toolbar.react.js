import React, { Component, PropTypes } from 'react';
import './Toolbar.less';

export default
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="toolbar">
      </div>
    );
  }
}

Toolbar.propTypes = {
};
Toolbar.defaultProps = {
};
