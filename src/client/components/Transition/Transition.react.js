import React, { Component, PropTypes } from 'react';
import { DraggableCore } from 'react-draggable';
import Bezier from 'bezier-js';
import './Transition.less';

const propTypes = {
  input: PropTypes.string.isRequired,
  description: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.string),
  arrowPosition: PropTypes.number,
  arrowSize: PropTypes.number,
  lineWidth: PropTypes.number,
  pointsColor1: PropTypes.string,
  pointsColor2: PropTypes.string,
  pointSize: PropTypes.number,
  color: PropTypes.string,
  snapGridStep: PropTypes.number,
  bezier: PropTypes.arrayOf(PropTypes.number),
  isHighlighted: PropTypes.bool,
  isSnap: PropTypes.bool,
  isShowBezierHelpers: PropTypes.bool,
  onBezierChange: PropTypes.func
};
const defaultProps = {
  lineWidth: 1,
  description: '',
  color: '#000',
  arrowPosition: 0,
  arrowSize: 20,
  pointsColor1: "#0f0",
  pointsColor2: "#f00",
  pointSize: 8,
  snapGridStep: 30,
  bezier: [100,25 , 10,90 , 110,100 , 150,195],
  isHighlighted: false,
  isSnap: false,
  isShowBezierHelpers: false,
  onBezierChange: () => {}
};

export default
class Transition extends Component {
  handleStart(e, data) {
    console.log('start');
  }

  handleStop(e, data) {
    console.log('stop');
  }

  handleDrag(e, data) {
    console.log('drag');
  }

  handlePoint1Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[0] = bezier[0] + data.deltaX;
    bezier[1] = bezier[1] + data.deltaY;
    this.props.onBezierChange(bezier);
  }

  handlePoint2Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[2] = bezier[2] + data.deltaX;
    bezier[3] = bezier[3] + data.deltaY;
    this.props.onBezierChange(bezier);
  }

  handlePoint3Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[4] = bezier[4] + data.deltaX;
    bezier[5] = bezier[5] + data.deltaY;
    this.props.onBezierChange(bezier);
  }

  handlePoint4Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[6] = bezier[6] + data.deltaX;
    bezier[7] = bezier[7] + data.deltaY;
    this.props.onBezierChange(bezier);
  }

  render() {
    const {
      input,
      actions,
      arrowPosition,
      arrowSize,
      lineWidth,
      color,
      pointsColor1,
      pointsColor2,
      pointSize,
      description,
      snapGridStep,
      bezier,
      isHighlighted,
      isSnap,
      isShowBezierHelpers,
      onBezierChange
    } = this.props;

    let curve = new Bezier(...bezier);
    let d = curve.toSVG();
    let inputTextPosition = curve.get(0.5);

    let bezierHelper1 = isShowBezierHelpers ? (
      <g>
        <line
          x1={bezier[0]}
          y1={bezier[1]}
          x2={bezier[2]}
          y2={bezier[3]}
          stroke={pointsColor2}
          strokeDasharray="3, 3"
        />
        <DraggableCore
          grid={isSnap ? [snapGridStep, snapGridStep] : null}
          onDrag={this.handlePoint1Drag.bind(this)}
        >
          <rect
            className="fsm--transition__point"
            x={bezier[0] - pointSize / 2 }
            y={bezier[1] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointsColor1}
            stroke={pointsColor1}
            strokeWidth={1}
          />
        </DraggableCore>
        <DraggableCore
          grid={isSnap ? [snapGridStep, snapGridStep] : null}
          onDrag={this.handlePoint2Drag.bind(this)}
          >
          <rect
            className="fsm--transition__point"
            x={bezier[2] - pointSize / 2 }
            y={bezier[3] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointsColor2}
            stroke={pointsColor2}
            strokeWidth={1}
          />
        </DraggableCore>
      </g>
    ) : null;

    let bezierHelper2 = isShowBezierHelpers ? (
      <g>
        <line
          x1={bezier[4]}
          y1={bezier[5]}
          x2={bezier[6]}
          y2={bezier[7]}
          stroke={pointsColor2}
          strokeDasharray="3, 3"
        />
        <DraggableCore
          grid={isSnap ? [snapGridStep, snapGridStep] : null}
          onDrag={this.handlePoint4Drag.bind(this)}
        >
          <rect
            className="fsm--transition__point"
            x={bezier[6] - pointSize / 2 }
            y={bezier[7] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointsColor1}
            stroke={pointsColor1}
            strokeWidth={1}
          />
        </DraggableCore>
        <DraggableCore
          grid={isSnap ? [snapGridStep, snapGridStep] : null}
          onDrag={this.handlePoint3Drag.bind(this)}
        >
          <rect
            className="fsm--transition__point"
            x={bezier[4] - pointSize / 2 }
            y={bezier[5] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointsColor2}
            stroke={pointsColor2}
            strokeWidth={1}
          />
        </DraggableCore>
      </g>
    ) : null;

    let markerPath = arrowPosition === 1 ?
      `M${arrowSize},0 L${arrowSize},${arrowSize / 2} L${0},${arrowSize / 4}` :
      `M0,0 L0,${arrowSize / 2} L${arrowSize},${arrowSize / 4}`;

    return (
      <DraggableCore
        grid={isSnap ? [snapGridStep, snapGridStep] : null}
        onStart={this.handleStart.bind(this)}
        onStop={this.handleStop.bind(this)}
        onDrag={this.handleDrag.bind(this)}
      >
        <g>
          <defs>
            <marker
              id="fsm--transition__arrow"
              markerWidth={arrowSize}
              markerHeight={arrowSize}
              refX={arrowPosition === 1 ? arrowSize / 2 : arrowSize}
              refY={arrowSize / 4}
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d={markerPath} fill={color} />
            </marker>
          </defs>
          <path
            d={d}
            fill="none"
            stroke={color}
            markerStart={arrowPosition === 1 ? 'url(#fsm--transition__arrow)' : 'none'}
            markerEnd={arrowPosition === 2 ? 'url(#fsm--transition__arrow)' : 'none'}
            strokeWidth={lineWidth}
          />
          <text
            x={inputTextPosition.x}
            y={inputTextPosition.y}
            fontFamily="monospace"
            fontSize="16"
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            {input}
          </text>
          {bezierHelper1}
          {bezierHelper2}
        </g>
      </DraggableCore>
    );
  }
}

Transition.propTypes = propTypes;
Transition.defaultProps = defaultProps;
