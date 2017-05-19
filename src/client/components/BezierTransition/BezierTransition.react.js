import React, { PureComponent, PropTypes } from 'react';
import BezierCurve from '../BezierCurve';
import './BezierTransition.less';
import { DraggableCore } from 'react-draggable';
import { getDistance, snapToPoints } from '../../svg-utils';

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
  color: '#333',
  cursorPosition: { x: 0, y: 0 },
  isHighlighted: false,
  isShowBezierHelpers: false,
  isSmoothMode: true,
  isSnapGrid: false,
  isSnapStickyPoints: true,
  lineWidth: 4,
  label: '',
  onBezierChange: () => {},
  pointSize: 8,
  pointsColor1: "#0f0",
  pointsColor2: "#f00",
  snapGridStep: 30,
  stickyDistance: 20,
  stickyPoints: [{ x: 20, y: 20 }, { x: 160, y: 160 }, { x: 220, y: 220 }]
};

// const smoothPointsTransition = (p1x, p1y, p2x, p2y, deltaX, deltaY) => {
//   return [p1x + deltaX, p1y + deltaY, p2x + deltaX, p2y + deltaY];
//   let halfDeltaX = deltaX / 2;
//   let halfDeltaY = deltaY / 2;
//   let p1xF = p1x;
//   let p1yF = p1y;
//   let p2xF = p2x;
//   let p2yF = p2y;
//   return ([ p1xF + halfDeltaX, p1yF + halfDeltaY, p2xF - halfDeltaX, p2yF - halfDeltaY ]);
// };

export default
class BezierTransition extends PureComponent {
  constructor(props) {
    super(props);
    this.handleBezierChange = this.handleBezierChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.prevBezier = nextProps.bezier;
  }

  handleBezierChange(bezier) {
    this.props.onBezierChange(snapToPoints, this.props.stickyPoints);
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

    let labelPosition = [0, 0]; // curve.get(0.5);

    // TODO Remove debug
    let debugDots = (
      <g>
        {stickyPoints.map(
          dot => <circle key={`${dot.x.toString() + dot.y.toString()}`} cx={dot.x} cy={dot.y} r="2" />)}
      </g>
    );

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
        <text
          x={labelPosition.x}
          y={labelPosition.y}
          fontSize="16"
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {label}
        </text>
        <BezierCurve
          bezier={bezier}
          onChange={this.handleBezierChange}
          markerStart={arrowPosition === 1 ? 'url(#fsm--bezier-transition__arrow)' : 'none'}
          markerEnd={arrowPosition === 2 ? 'url(#fsm--bezier-transition__arrow)' : 'none'}
          stroke={color}
          strokeWidth={lineWidth}
        />
        {debugDots}
      </g>
    );
  }
}

BezierTransition.propTypes = propTypes;
BezierTransition.defaultProps = defaultProps;
