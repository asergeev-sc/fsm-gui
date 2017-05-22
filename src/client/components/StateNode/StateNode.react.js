import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import { getCirclePath, pathToPoints, pointsToPath } from '../../svg-utils';
import tinycolor from 'tinycolor2';
import './StateNode.less';

const paddingV = 20;
const paddingH = 60;
const pointOffset = 1;
const outlinePadding = 3;
const getContrastColor = (color, amount = 10) => tinycolor(color).getBrightness() > 70 ?
  tinycolor(color).darken(amount) :
  tinycolor(color).lighten(amount) ;

const propTypes = {
  label: PropTypes.string,
  lineWidth: PropTypes.number,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  description: PropTypes.string,
  snapStep: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  selected: PropTypes.bool,
  finalState: PropTypes.bool,
  snap: PropTypes.bool,
  showPoints: PropTypes.bool,
  debug: PropTypes.bool,
  onClick: PropTypes.func,
  onMousedDown: PropTypes.func,
  onMousedUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onPointMouseDown: PropTypes.func,
  onPointMouseUp: PropTypes.func,
  onPointMouseEnter: PropTypes.func,
  onPointMouseLeave: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func,
  onDrag: PropTypes.func
};
const defaultProps = {
  label: '',
  lineWidth: 1,
  color: '#000',
  bgColor: '#0277bd',
  textColor: '#fff',
  description: '',
  snapStep: 20,
  x: 0,
  y: 0,
  selected: false,
  finalState: false,
  snap: true,
  showPoints: false,
  debug: true,
  onClick: () => {},
  onMousedDown: () => {},
  onMousedUp: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onPointMouseDown: () => {},
  onPointMouseUp: () => {},
  onPointMouseEnter: () => {},
  onPointMouseLeave: () => {},
  onDoubleClick: () => {},
  onDragStart: () => {},
  onDragStop: () => {},
  onDrag: () => {}
};

export default
class StateNode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labelElement: null,
      rectElement: null,
      selectedPoint: null
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleLabelElementRef = this.handleLabelElementRef.bind(this);
    this.handleRectElementRef = this.handleRectElementRef.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handlePointMouseDown = this.handlePointMouseDown.bind(this);
    this.handlePointMouseUp = this.handlePointMouseUp.bind(this);
    this.handlePointMouseEnter = this.handlePointMouseEnter.bind(this);
    this.handlePointMouseLeave = this.handlePointMouseLeave.bind(this);
  }

  handleStart(e, data) {
    this.props.onDragStart(e, data);
  }

  handleStop(e, data) {
    this.props.onDragStop(e, data);
  }

  handleDrag(e, data) {
    this.props.onDrag(e, data);
  }

  handleLabelElementRef(ref) {
    this.setState({ labelElement: ref });
  }

  handleRectElementRef(ref) {
    this.setState({ rectElement: ref });
  }

  handleMouseEnter(e) {
    this.props.onMouseEnter(e);
  }

  handleMouseLeave(e) {
    this.props.onMouseLeave(e);
  }

  handlePointMouseEnter(e, index) {
    this.setState({ selectedPoint: index });
    this.props.onPointMouseEnter(e, index);
  }

  handlePointMouseLeave(e, index) {
    this.setState({ selectedPoint: null });
    this.props.onPointMouseLeave(e, index);
  }

  handlePointMouseDown(e, index) {
    this.setState({ selectedPoint: index });
    this.props.onMouseDown(e);
    this.props.onPointMouseDown(e, index);
  }

  handlePointMouseUp(e, index) {
    this.setState({ selectedPoint: null });
    this.props.onMouseDown(e);
    this.props.onPointMouseUp(e, index);
  }

  renderPoints(xPointsCount = 3) {
    const box = this.state.rectElement.getBBox();
    const xStep = box.width / (xPointsCount + 1);
    const pointPositions = [
      // Top points
      { x: box.x + xStep, y: box.y - pointOffset },
      { x: box.x + xStep * 2, y: box.y - pointOffset },
      { x: box.x + xStep * 3, y: box.y - pointOffset },

      // Right points
      { x: box.x + box.width + pointOffset, y: box.y + box.height / 2 },

      // Bottom point
      { x: box.x + xStep, y: box.y + box.height + pointOffset },
      { x: box.x + xStep * 2, y: box.y + box.height + pointOffset },
      { x: box.x + xStep * 3, y: box.y + box.height + pointOffset },

      // Left points
      { x: box.x - pointOffset, y: box.y + box.height / 2 }
    ];

    const contrastBg = getContrastColor(this.props.bgColor);

    return pointPositions.map((pointPosition, index) => (
      <circle
        key={index}
        cx={pointPosition.x}
        cy={pointPosition.y}
        r={6}
        strokeWidth="2"
        stroke={contrastBg}
        fill={this.state.selectedPoint === index ? contrastBg : '#fff'}
        onMouseDown={(e) => this.handlePointMouseDown(e, index)}
        onMouseUp={(e) => this.handlePointMouseUp(e, index)}
        onMouseEnter={(e) => this.handlePointMouseEnter(e, index)}
        onMouseLeave={(e) => this.handlePointMouseLeave(e, index)}
        className="fsm--state-node__point"
      />
    ));
  }

  render() {
    const {
      label,
      lineWidth,
      color,
      bgColor,
      description,
      snapStep,
      textColor,
      x,
      y,
      selected,
      finalState,
      snap,
      showPoints,
      debug,
      onClick,
      onMouseDown,
      onMouseUp,
      onDoubleClick,
      onDragStart,
      onDragStop,
      onDrag
    } = this.props;
    console.log(this.state);
    // const finalStateCircle = finalState ? (
    //   <path
    //     d={getCirclePath(x, y, radius - radius / 10)}
    //     fill="none"
    //     stroke={color}
    //     strokeWidth={lineWidth}
    //   />
    // ) : null;

    // const circlePoints = this.circlePathElement ? pathToPoints(this.circlePathElement, 32) : null;
    // const segmentedCircle = circlePoints ? pointsToPath(circlePoints, true) : null;

    // const debugPath = debug ? (
    //   <path
    //     d={segmentedCircle}
    //     fill="none"
    //     stroke={'#0ff'}
    //     strokeWidth={lineWidth}
    //   />
    // ) : null;
    // if(debug) {
    //   console.log(`StateNode ${label}`, this);
    // }

    const labelElementBBox = this.state.labelElement && this.state.labelElement.getBBox();
    const width = labelElementBBox && labelElementBBox.width;
    const height = labelElementBBox && labelElementBBox.height;
    const points = showPoints && this.state.rectElement ? this.renderPoints() : null;
    const outline = (
      <rect
        x={x - width / 2 - paddingH / 2 - outlinePadding }
        y={y - height / 2 - paddingV / 2 - outlinePadding }
        rx="2"
        ry="2"
        width={width + paddingH + outlinePadding * 2}
        height={height + paddingV + outlinePadding * 2}
        fill={selected ? '#fff' : 'transparent'}
        strokeWidth={2}
        stroke={selected ? getContrastColor(this.props.bgColor) : 'transparent'}
      />
    );

    return (
      <DraggableCore
        grid={snap ? [snapStep, snapStep] : null}
        onStart={this.handleStart}
        onStop={this.handleStop}
        onDrag={this.handleDrag}
      >
        <g
          className="fsm--state-node"
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {outline}
          <rect
            ref={this.handleRectElementRef}
            x={x - width / 2 - paddingH / 2}
            y={y - height / 2 - paddingV / 2}
            rx="2"
            ry="2"
            width={width + paddingH}
            height={height + paddingV}
            fill={bgColor}
            strokeWidth={lineWidth}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}

          />
          <text
            ref={this.handleLabelElementRef}
            x={x}
            y={y}
            fontSize="16"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            style={{ userSelect: "none" }}
            fill={textColor}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            {label}
          </text>
          {points}
        </g>
      </DraggableCore>
    );
  }
}

StateNode.propTypes = propTypes;
StateNode.defaultProps = defaultProps;
