import React, { PureComponent, PropTypes } from 'react';
import { DraggableCore } from 'react-draggable';
import Bezier from 'bezier-js';
import './BezierCurve.less';

const propTypes = {
  bezier: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  onPoint1Drag: PropTypes.func,
  onPoint2Drag: PropTypes.func,
  onPoint3Drag: PropTypes.func,
  onPoint4Drag: PropTypes.func,
  pointColor1: PropTypes.string,
  pointColor2: PropTypes.string,
  pointSize: PropTypes.number,
  showControls: PropTypes.bool
};
const defaultProps = {
  bezier: [0,0 , 0,0 , 0,0 , 0,0],
  onChange: () => {},
  onPoint1Drag: () => {},
  onPoint2Drag: () => {},
  onPoint3Drag: () => {},
  onPoint4Drag: () => {},
  pointColor1: '#0f0',
  pointColor2: '#f00',
  pointSize: 8,
  showControls: true,
  stroke: '#000',
  strokeWidth: 1
};

export default
class BezierCurve extends PureComponent {
  handleChange(bezier, d) {
    this.props.onChange(bezier, this.pathElement);
  }

  handlePoint1Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[0] = bezier[0] + data.deltaX;
    bezier[1] = bezier[1] + data.deltaY;
    this.handleChange(bezier);
  }

  handlePoint2Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[2] = bezier[2] + data.deltaX;
    bezier[3] = bezier[3] + data.deltaY;
    this.handleChange(bezier);
  }

  handlePoint3Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[4] = bezier[4] + data.deltaX;
    bezier[5] = bezier[5] + data.deltaY;
    this.handleChange(bezier);
  }

  handlePoint4Drag(e, data) {
    let bezier = [...this.props.bezier];
    bezier[6] = bezier[6] + data.deltaX;
    bezier[7] = bezier[7] + data.deltaY;
    this.handleChange(bezier);
  }

  render() {
    const {
      bezier,
      pointColor1,
      pointColor2,
      pointSize,
      showControls,
      onChange,
      onPoint1Drag,
      onPoint2Drag,
      onPoint3Drag,
      onPoint4Drag,
      ...restProps
    } = this.props;

    let curve = new Bezier(...bezier);
    let d = curve.toSVG();

    let controls1 = showControls ? (
      <g>
        <line
          className="bezier-curve__control-line"
          x1={bezier[0]}
          y1={bezier[1]}
          x2={bezier[2]}
          y2={bezier[3]}
        />
        <DraggableCore onDrag={this.handlePoint1Drag.bind(this)}>
          <rect
            className="bezier-curve__control-point"
            x={bezier[0] - pointSize / 2 }
            y={bezier[1] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointColor1}
            stroke={pointColor1}
            strokeWidth={1}
          />
        </DraggableCore>
        <DraggableCore onDrag={this.handlePoint2Drag.bind(this)}>
          <rect
            className="bezier-curve__control-point"
            x={bezier[2] - pointSize / 2 }
            y={bezier[3] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointColor2}
            stroke={pointColor2}
            strokeWidth={1}
          />
        </DraggableCore>
      </g>
    ) : null;

    let controls2 = showControls ? (
      <g>
        <line
          className="bezier-curve__control-line"
          x1={bezier[4]}
          y1={bezier[5]}
          x2={bezier[6]}
          y2={bezier[7]}
        />
        <DraggableCore onDrag={this.handlePoint4Drag.bind(this)}>
          <rect
            className="bezier-curve__control-point"
            x={bezier[6] - pointSize / 2 }
            y={bezier[7] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointColor1}
            stroke={pointColor1}
            strokeWidth={1}
          />
        </DraggableCore>
        <DraggableCore onDrag={this.handlePoint3Drag.bind(this)}>
          <rect
            className="bezier-curve__control-point"
            x={bezier[4] - pointSize / 2 }
            y={bezier[5] - pointSize / 2}
            width={pointSize}
            height={pointSize}
            fill={pointColor2}
            stroke={pointColor2}
            strokeWidth={1}
          />
        </DraggableCore>
      </g>
    ) : null;

    return (
      <g>
        <path
          d={d}
          fill="none"
          ref={ref => (this.pathElement = ref)}
          {...restProps}
        />
        {controls1}
        {controls2}
      </g>
    );
  }
}

BezierCurve.propTypes = propTypes;
BezierCurve.defaultProps = defaultProps;
