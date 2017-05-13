import React, { Component, PropTypes } from 'react';
import './Toolbar.less';

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func,
    iconSVG: PropTypes.string,
    disabled: PropTypes.bool
  }))
};
const defaultProps = {
  actions: []
};

export default
class Toolbar extends Component {
  render() {
    return (
      <div className="fsm--toolbar">
      </div>
    );
  }
}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;
