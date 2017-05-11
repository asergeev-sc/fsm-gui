import React, { Component, PropTypes } from 'react';
import { DraggableCore } from 'react-draggable';
import './StateNode.less';

const propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired, // Must be binary
  entryActions: PropTypes.arrayOf(PropTypes.string),
  exitActions: PropTypes.arrayOf(PropTypes.string),
  radius: PropTypes.number,
  lineWidth: PropTypes.number,
  color: PropTypes.string,
  highlightColor: PropTypes.string,
  description: PropTypes.string,
  snapGridStep: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  isHighlighted: PropTypes.bool,
  isFinalState: PropTypes.bool,
  isSnap: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func,
  onDrag: PropTypes.func
};
const defaultProps = {
  entryActions: null,
  exitActions: null,
  radius: 60,
  lineWidth: 2,
  color: '#000',
  highlightColor: "#f00",
  description: '',
  snapGridStep: 30,
  x: 0,
  y: 0,
  isHighlighted: false,
  isFinalState: false,
  isSnap: false,
  onClick: () => {},
  onDoubleClick: () => {},
  onDragStart: () => {},
  onDragStop: () => {},
  onDrag: () => {}
};

export default
class StateNode extends Component {
  handleStart(e, data) {
    this.props.onDragStart(e, data);
  }

  handleStop(e, data) {
    this.props.onDragStop(e, data);
  }

  handleDrag(e, data) {
    this.props.onDrag(e, data);
  }

  render() {
    const {
      name,
      code,
      entryActions,
      exitActions,
      radius,
      lineWidth,
      color,
      highlightColor,
      description,
      snapGridStep,
      x,
      y,
      isHighlighted,
      isFinalState,
      isSnap,
      onClick,
      onDoubleClick,
      onDragStart,
      onDragStop,
      onDrag
    } = this.props;

    const finalStateCircle = isFinalState ? (
      <circle
        cx={x}
        cy={y}
        r={radius - radius / 10 }
        fill="none"
        stroke={color}
        strokeWidth={lineWidth}
      >
      </circle>
    ) : null;

    return (
      <DraggableCore
        grid={isSnap ? [snapGridStep, snapGridStep] : null}
        onStart={this.handleStart.bind(this)}
        onStop={this.handleStop.bind(this)}
        onDrag={this.handleDrag.bind(this)}
      >
        <g>
          <rect
            x={x - radius}
            y={y - radius}
            width={radius * 2}
            height={radius * 2}
            fill="#fff"
            stroke={isHighlighted ? highlightColor : 'none'}
            strokeWidth={lineWidth}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onDrag={() => console.log('drag')}
          />
          <circle
            cx={x}
            cy={y}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={lineWidth}
            >
          </circle>
          <text
            x={x}
            y={y}
            fontFamily="monospace"
            fontSize="16"
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            {name}
          </text>
          {finalStateCircle}
        </g>
      </DraggableCore>
    );
  }
}

StateNode.propTypes = propTypes;
StateNode.defaultProps = defaultProps;
