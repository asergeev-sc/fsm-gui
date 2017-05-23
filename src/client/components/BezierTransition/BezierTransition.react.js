import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
  selected: PropTypes.bool,
  showPoints: PropTypes.bool,
  snap: PropTypes.bool,
  snapStep: PropTypes.number,
  label: PropTypes.string,
  lineWidth: PropTypes.number,
  cursorPosition: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  onChange: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onClick: PropTypes.func,
  pointSize: PropTypes.number,
  pointsColor1: PropTypes.string,
  pointsColor2: PropTypes.string,
  snapStep: PropTypes.number,
  stickyDistance: PropTypes.number,
  stickyPoints: PropTypes.arrayOf(PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }))
};
const defaultProps = {
  arrowPosition: 0,
  arrowSize: 30,
  bezier: [100,25 , 10,90 , 110,100 , 150,195],
  color: '#333',
  cursorPosition: { x: 0, y: 0 },
  selected: false,
  showPoints: false,
  snap: true,
  snapStep: 20,
  lineWidth: 4,
  label: '',
  onChange: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onClick: () => {},
  pointSize: 12,
  pointsColor1: "#0f0",
  pointsColor2: "#f00",
  snapStep: 30,
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
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.prevBezier = nextProps.bezier;
  }

  handleBezierChange(bezier) {
    this.props.onChange(bezier);
  }

  handleMouseDown(e) {
    this.props.onMouseDown(e);
  }

  handleMouseUp(e) {
    this.props.onMouseUp(e);
  }

  handleClick(e) {
    this.props.onClick(e);
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
      snap,
      snapStep,
      bezier,
      selected,
      showPoints,
      onChange,
      stickyPoints
    } = this.props;

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
      <g
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
      >
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
        <BezierCurve
          bezier={bezier}
          snap={snap}
          snapStep={snapStep}
          onChange={this.handleBezierChange}
          label={label}
          markerStart={arrowPosition === 1 ? 'url(#fsm--bezier-transition__arrow)' : 'none'}
          markerEnd={arrowPosition === 2 ? 'url(#fsm--bezier-transition__arrow)' : 'none'}
          pointSize={pointSize}
          stroke={color}
          strokeWidth={lineWidth}
          showControls={selected}
        />
      </g>
    );
  }
}

BezierTransition.propTypes = propTypes;
BezierTransition.defaultProps = defaultProps;
