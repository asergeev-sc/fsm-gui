import React, { Component, PropTypes } from 'react';
import { DraggableCore } from 'react-draggable';
import './Transition.less';

const propTypes = {
  name: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string),
  lineWidth: PropTypes.number,
  color: PropTypes.string,
  highlightColor: PropTypes.string,
  description: PropTypes.string,
  snapGridStep: PropTypes.number,
  x1: PropTypes.number,
  y1: PropTypes.number,
  x2: PropTypes.number,
  y2: PropTypes.number,
  isHighlighted: PropTypes.bool,
  isSnap: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func,
  onDrag: PropTypes.func
};
const defaultProps = {
  lineWidth: 2,
  color: '#000',
  highlightColor: "#f00",
  description: '',
  snapGridStep: 30,
  x1: 10,
  y1: 10,
  x2: 50,
  y2: 50,
  isHighlighted: false,
  isSnap: false,
  onClick: () => {},
  onDoubleClick: () => {},
  onDragStart: () => {},
  onDragStop: () => {},
  onDrag: () => {}
};

export default
class Transition extends Component {
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
      actions,
      lineWidth,
      color,
      highlightColor,
      description,
      snapGridStep,
      x,
      y,
      isHighlighted,
      isSnap,
      onClick,
      onDoubleClick,
      onDragStart,
      onDragStop,
      onDrag
    } = this.props;

    return (
      <DraggableCore
        grid={isSnap ? [snapGridStep, snapGridStep] : null}
        onStart={this.handleStart.bind(this)}
        onStop={this.handleStop.bind(this)}
        onDrag={this.handleDrag.bind(this)}
      >
        <g>
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
        </g>
      </DraggableCore>
    );
  }
}

Transition.propTypes = propTypes;
Transition.defaultProps = defaultProps;
