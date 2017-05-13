import React, { Component, PropTypes } from 'react';
import sizeMe from 'react-sizeme';
import './Viewport.less';

const propTypes = {
  isAllowMove: PropTypes.bool,
  gridSize: PropTypes.number,
  scale: PropTypes.number,
  size: PropTypes.object,
  onWheel: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMove: PropTypes.func
};
const defaultProps = {
  isAllowMove: true,
  gridSize: 8,
  scale: 1,
  size: null,
  onWheel: () => {},
  onMouseMove: () => {},
  onMouseLeave: () => {},
  onMove: () => {}
};

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseInside: false,
      isMouseDown: false
    };
  }

  handleMouseDown(e) {
    this.setState({ isMouseDown: true });
  }

  handleMouseUp(e) {
    this.setState({ isMouseDown: false });
  }

  handleMouseEnter(e) {
    this.setState({ isMouseInside: true });
  }

  handleMouseLeave(e) {
    this.setState({ isMouseInside: false });
    this.props.onMouseLeave(e, { x: null, y: null });
  }

  handleMouseMove(e) {
    const viewportMouseX = (e.clientX - this.props.size.position.left) / this.props.scale;
    const viewportMouseY = (e.clientY - this.props.size.position.top) / this.props.scale;
    this.props.onMouseMove(e, { x: viewportMouseX, y: viewportMouseY });
  }

  handleWheel(e) {
    e.preventDefault();
    this.handleMouseMove(e);
    this.props.onWheel(e);
  }

  render() {
    const {
      isAllowMove,
      gridSize,
      onWheel,
      scale,
      size,
      children
    } = this.props;

    const { isMouseDown } = this.state;

    const viewportWidth = size.width / scale;
    const viewportHeight = size.height / scale;

    const bigGridSize = gridSize * 10;
    const defs = (
      <defs key={Math.random()}>
        <pattern id="smallGrid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="gray" strokeWidth="0.5"/>
        </pattern>
        <pattern id="grid" width={bigGridSize} height={bigGridSize} patternUnits="userSpaceOnUse">
          <rect width={bigGridSize} height={bigGridSize} fill="url(#smallGrid)"/>
          <path d={`M ${bigGridSize} 0 L 0 0 0 ${bigGridSize}`} fill="none" stroke="gray" strokeWidth="1"/>
        </pattern>
      </defs>
    );

    return (
      <div
        className={`fsm--viewport ${(isAllowMove && isMouseDown) ? 'fsm--viewport--move-allowed' : ''}`}
        onWheel={this.handleWheel.bind(this)}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
      >
        <svg
          version="1.1"
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewportWidth} ${viewportHeight}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {defs}
          <rect width="100%" height="100%" fill="url(#grid)" />
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
