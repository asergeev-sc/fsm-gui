import React, { Component, PropTypes } from 'react';
import sizeMe from 'react-sizeme';
import './Viewport.less';

const propTypes = {
  scale: PropTypes.number,
  size: PropTypes.object,
  onWheel: PropTypes.func,
  onMouseMove: PropTypes.func
};
const defaultProps = {
  scale: 1,
  size: null,
  onWheel: () => {},
  onMouseMove: () => {}
};

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrackMouse: false
    };
  }

  handleMouseEnter(e) {
    this.setState({ isTrackMouse: true });
  }

  handleMouseLeave(e) {
    this.setState({ isTrackMouse: false });
  }

  handleMouseMove(e) {
    if(this.state.isTrackMouse) {
      const viewportMouseX = (e.clientX - this.props.size.position.left) / this.props.scale;
      const viewportMouseY = (e.clientY - this.props.size.position.top) / this.props.scale;
      console.log(viewportMouseX, viewportMouseY);
      this.props.onMouseMove(e, { x: viewportMouseX, y: viewportMouseY });
    }
  }

  handleWheel(e) {
    e.preventDefault();
    this.props.onWheel(e);
  }

  render() {
    const {
      onWheel,
      scale,
      size,
      children
    } = this.props;

    const viewportWidth = size.width / scale;
    const viewportHeight = size.height / scale;

    return (
      <div
        className="fsm--viewport"
        onWheel={this.handleWheel.bind(this)}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
      >
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

const sizeMeConfig = {
  monitorWidth: true,
  monitorHeight: true,
  monitorPosition: true
};
export default sizeMe(sizeMeConfig)(Viewport);
