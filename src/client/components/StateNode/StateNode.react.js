import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';
import { getCirclePath, pathToPoints, pointsToPath } from '../../svg-utils';
import './StateNode.less';

const paddingV = 20;
const paddingH = 60;

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
  debug: PropTypes.bool,
  onClick: PropTypes.func,
  onMousedDown: PropTypes.func,
  onMousedUp: PropTypes.func,
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
  debug: true,
  onClick: () => {},
  onMousedDown: () => {},
  onMousedUp: () => {},
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
      labelElement: null
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleLabelElementRef = this.handleLabelElementRef.bind(this);
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
      debug,
      onClick,
      onMouseDown,
      onMouseUp,
      onDoubleClick,
      onDragStart,
      onDragStop,
      onDrag
    } = this.props;

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

    console.log('node render');

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
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onDoubleClick={onDoubleClick}
        >
          <rect
            x={x - width / 2 - paddingH / 2}
            y={y - height / 2 - paddingV / 2}
            rx="2"
            ry="2"
            width={width + paddingH}
            height={height + paddingV}
            fill={bgColor}
            strokeWidth={lineWidth}
          />
          <text
            x={x}
            y={y}
            fontSize="16"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={textColor}
            ref={this.handleLabelElementRef}
          >
            {label}
          </text>
        </g>
      </DraggableCore>
    );
  }
}

StateNode.propTypes = propTypes;
StateNode.defaultProps = defaultProps;
