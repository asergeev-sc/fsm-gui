import React, { PureComponent, PropTypes } from 'react';
import { DraggableCore } from 'react-draggable';
import Bezier from 'bezier-js';
import './BezierTransition.less';
import { getDistance } from '../../svg-utils';

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string),
  arrowPosition: PropTypes.number,
  arrowSize: PropTypes.number,
  bezier: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
  isHighlighted: PropTypes.bool,
  isShowBezierHelpers: PropTypes.bool,
  isSmoothMode: PropTypes.bool,
  isSnapGrid: PropTypes.bool,
  isSnapStickyPoints: PropTypes.bool,
  label: PropTypes.string,
  lineWidth: PropTypes.number,
  cursorPosition: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  onBezierChange: PropTypes.func,
  pointSize: PropTypes.number,
  pointsColor1: PropTypes.string,
  pointsColor2: PropTypes.string,
  snapGridStep: PropTypes.number,
  stickyDistance: PropTypes.number,
  stickyPoints: PropTypes.arrayOf(PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }))
};
const defaultProps = {
  arrowPosition: 0,
  arrowSize: 30,
  bezier: [100,25 , 10,90 , 110,100 , 150,195],
  color: '#000',
  cursorPosition: { x: 0, y: 0 },
  isHighlighted: false,
  isShowBezierHelpers: false,
  isSmoothMode: true,
  isSnapGrid: false,
  isSnapStickyPoints: true,
  lineWidth: 1,
  label: '',
  onBezierChange: () => {},
  pointSize: 8,
  pointsColor1: "#0f0",
  pointsColor2: "#f00",
  snapGridStep: 30,
  stickyDistance: 20,
  stickyPoints: [{ x: 20, y: 20 }, { x: 160, y: 160 }, { x: 220, y: 220 }]
};

const smoothPointsTransition = (p1x, p1y, p2x, p2y, deltaX, deltaY) => {
  let halfDeltaX = deltaX / 2;
  let halfDeltaY = deltaY / 2;
  let p1xF = p1x;
  let p1yF = p1y;
  let p2xF = p2x;
  let p2yF = p2y;
  return ([ p1xF + halfDeltaX, p1yF + halfDeltaY, p2xF - halfDeltaX, p2yF - halfDeltaY ]);
};

export default
class BezierTransition extends PureComponent {
  handleStart(e, data) {
    console.log('start');
  }

  handleStop(e, data) {
    console.log('stop');
  }

  handleDrag(e, data) {
    console.log('drag');
  }

  trySnapToPoint(bezier, xIndex, yIndex) {
    // TODO Optimize it
    const distances = this.props.stickyPoints.map(
      point => getDistance(bezier[xIndex], bezier[yIndex], point.x, point.y)
    );
    const minimalDistance = Math.min(...distances);

    if(minimalDistance > this.props.stickyDistance) {
      return bezier;
    }

    const snapPointIndex = distances.indexOf(minimalDistance);
    const pointToSnap = snapPointIndex === -1 ? null : this.props.stickyPoints[snapPointIndex];

    if(pointToSnap !== null) {
      bezier[xIndex] = pointToSnap.x;
      bezier[yIndex] = pointToSnap.y;
    }

    return bezier;
 }

  handlePoint1Drag(e, data) {
    let bezier = [...this.props.bezier];

    if(!this.props.isSmoothMode) {
      bezier[0] = bezier[0] + data.deltaX;
      bezier[1] = bezier[1] + data.deltaY;
    }

    if(this.props.isSmoothMode) {
      let smoothPoints = smoothPointsTransition(
        bezier[0],
        bezier[1],
        bezier[2],
        bezier[3],
        data.deltaX,
        data.deltaY
      );

      bezier[0] = smoothPoints[0];
      bezier[1] = smoothPoints[1];
      bezier[2] = smoothPoints[2];
      bezier[3] = smoothPoints[3];
    }

    if(this.props.isSnapStickyPoints) {
      bezier = this.trySnapToPoint(bezier, 0, 1);
    }

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
    if(!this.props.isSmoothMode) {
      bezier[6] = bezier[6] + data.deltaX;
      bezier[7] = bezier[7] + data.deltaY;
    }

    if(this.props.isSmoothMode) {
      let smoothPoints = smoothPointsTransition(
        bezier[6],
        bezier[7],
        bezier[4],
        bezier[5],
        data.deltaX,
        data.deltaY
      );

      bezier[6] = smoothPoints[0];
      bezier[7] = smoothPoints[1];
      bezier[4] = smoothPoints[2];
      bezier[5] = smoothPoints[3];
    }

    if(this.props.isSnapStickyPoints) {
      bezier = this.trySnapToPoint(bezier, 6, 7);
    }

    this.props.onBezierChange(bezier);
  }

  render() {
    const {
      label,
      actions,
      arrowPosition,
      arrowSize,
      lineWidth,
      color,
      pointsColor1,
      pointsColor2,
      pointSize,
      snapGridStep,
      bezier,
      isHighlighted,
      isSnapGrid,
      isShowBezierHelpers,
      onBezierChange,
      stickyPoints
    } = this.props;

    let curve = new Bezier(...bezier);
    let d = curve.toSVG();
    let labelPosition = curve.get(0.5);

    // TODO Remove debug
    let debugDots = (
      <g>
        {stickyPoints.map(
          dot => <circle key={`${dot.x.toString() + dot.y.toString()}`} cx={dot.x} cy={dot.y} r="2" />)}
      </g>
    );

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
          grid={isSnapGrid ? [snapGridStep, snapGridStep] : null}
          onDrag={this.handlePoint1Drag.bind(this)}
        >
          <rect
            className="fsm--bezier-transition__point"
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
          grid={isSnapGrid ? [snapGridStep, snapGridStep] : null}
          onDrag={this.handlePoint2Drag.bind(this)}
          >
          <rect
            className="fsm--bezier-transition__point"
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
          grid={isSnapGrid ? [snapGridStep, snapGridStep] : null}
          onDrag={this.handlePoint4Drag.bind(this)}
        >
          <rect
            className="fsm--bezier-transition__point"
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
          grid={isSnapGrid ? [snapGridStep, snapGridStep] : null}
          onDrag={this.handlePoint3Drag.bind(this)}
        >
          <rect
            className="fsm--bezier-transition__point"
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
      <g>
        <defs>
          <marker
            id="fsm--bezier-transition__arrow"
            markerWidth={arrowSize}
            markerHeight={arrowSize}
            refX={arrowPosition === 1 ? arrowSize / 6 : arrowSize - arrowSize / 6}
            refY={arrowSize / 4}
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d={markerPath} fill={color} />
          </marker>
        </defs>
        <path
          d={d}
          fill="none"
          stroke={color}
          markerStart={arrowPosition === 1 ? 'url(#fsm--bezier-transition__arrow)' : 'none'}
          markerEnd={arrowPosition === 2 ? 'url(#fsm--bezier-transition__arrow)' : 'none'}
          strokeWidth={lineWidth}
        />
        <text
          x={labelPosition.x}
          y={labelPosition.y}
          fontFamily="monospace"
          fontSize="16"
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {label}
        </text>
        {bezierHelper1}
        {bezierHelper2}
        {debugDots}
      </g>
    );
  }
}

BezierTransition.propTypes = propTypes;
BezierTransition.defaultProps = defaultProps;
