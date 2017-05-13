import React, { Component, PropTypes } from 'react';
import sizeMe from 'react-sizeme';
import './Viewport.less';

const propTypes = {
  scale: PropTypes.number,
  size: PropTypes.object
};
const defaultProps = {
  scale: 1,
  size: null
};

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      scale,
      size,
      children
    } = this.props;

    const viewportWidth = size.width / scale;
    const viewportHeight = size.height / scale;

    return (
      <div className="fsm--viewport">
        <svg
          version="1.1"
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewportWidth} ${viewportWidth}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {children}
        </svg>
      </div>
    );
  }
}

Viewport.propTypes = propTypes;
Viewport.defaultProps = defaultProps;

export default sizeMe()(Viewport);
