import React, { Component, PropTypes } from 'react';
import './ToolbarButton.less';

export default
class ToolbarButton extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="toolbar-button">
      </div>
    );
  }
}

ToolbarButton.propTypes = {
};
ToolbarButton.defaultProps = {
};
