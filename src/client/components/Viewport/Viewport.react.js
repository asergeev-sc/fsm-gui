import React, { Component, PropTypes } from 'react';
import { DraggableCore } from 'react-draggable';
import sizeMe from 'react-sizeme';
import './Viewport.less';

const workareaWidth = 10000;
const workareaHeight = 10000;

const propTypes = {
  isAllowPan: PropTypes.bool,
  gridSize: PropTypes.number,
  isShowGrid: PropTypes.bool,
  scale: PropTypes.number,
  size: PropTypes.object,
  onWheel: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseClick: PropTypes.func,
  onPan: PropTypes.func,
  panOffsetX: PropTypes.number,
  panOffsetY: PropTypes.number
};
const defaultProps = {
  isAllowPan: true,
  gridSize: 40,
  isShowGrid: false,
  scale: 1,
  size: null,
  onWheel: () => {},
  onMouseMove: () => {},
  onMouseLeave: () => {},
  onPan: () => {},
  panOffsetX: 0,
  panOffsetY: 0
};

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseInside: false,
      isPanning: false
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleMouseDown(e) {
    this.setState({ isPanning: true });
  }

  handleMouseUp(e) {
    this.setState({ isPanning: false });
  }

  handleMouseEnter(e) {
    this.setState({ isMouseInside: true });
  }

  handleMouseLeave(e) {
    this.setState({ isMouseInside: false });
    this.props.onMouseLeave(e, { x: null, y: null });
  }

  handleMouseMove(e) {
    const viewportMouseX = (e.clientX - this.props.size.position.left) / this.props.scale - this.props.panOffsetX;
    const viewportMouseY = (e.clientY - this.props.size.position.top) / this.props.scale - this.props.panOffsetY;
    this.props.onMouseMove(e, { x: viewportMouseX, y: viewportMouseY });
  }

  handleWheel(e) {
    e.preventDefault();
    this.handleMouseMove(e);
    this.props.onWheel(e);
  }

  handleDrag(e, data) {
    if(this.props.isAllowPan) {
      this.props.onPan(e, data);
    }
  }

  render() {
    const {
      isAllowPan,
      gridSize,
      isShowGrid,
      onWheel,
      onClick,
      onMouseDown,
      onMouseUp,
      scale,
      size,
      children,
      panOffsetX,
      panOffsetY
    } = this.props;

    const { isPanning } = this.state;

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
        className={`fsm--viewport ${(isPanning) ? 'fsm--viewport--panning' : ''}`}
        onWheel={this.handleWheel}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <DraggableCore
          onDrag={this.handleDrag}
        >
          <svg
            version="1.1"
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewportWidth} ${viewportHeight}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            {defs}
            <g transform={`translate(${panOffsetX},${panOffsetY})`}>
              <rect
                width={workareaWidth}
                height={workareaHeight}
                fill={isShowGrid ? 'url(#grid)' : 'none'}
                stroke="#aaa"
                onMouseDown={onMouseDown}
                onClick={onClick}
              />
              {children}
            </g>
          </svg>
        </DraggableCore>
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
