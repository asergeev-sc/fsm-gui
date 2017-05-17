import React, { PureComponent, PropTypes } from 'react';
import { DraggableCore } from 'react-draggable';
import { getCirclePath, pathToPoints, pointsToPath } from '../../svg-utils';
import './StateNode.less';

const padding = 20;

const propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired, // Must be binary
  entryActions: PropTypes.arrayOf(PropTypes.string),
  exitActions: PropTypes.arrayOf(PropTypes.string),
  lineWidth: PropTypes.number,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  description: PropTypes.string,
  snapGridStep: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  isHighlighted: PropTypes.bool,
  isFinalState: PropTypes.bool,
  isSnap: PropTypes.bool,
  isDebug: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func,
  onDrag: PropTypes.func
};
const defaultProps = {
  entryActions: null,
  exitActions: null,
  lineWidth: 1,
  color: '#000',
  bgColor: '#e70',
  textColor: '#fff',
  description: '',
  snapGridStep: 30,
  x: 0,
  y: 0,
  isHighlighted: false,
  isFinalState: false,
  isSnap: false,
  isDebug: true,
  onClick: () => {},
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
      name,
      code,
      entryActions,
      exitActions,
      lineWidth,
      color,
      bgColor,
      description,
      snapGridStep,
      textColor,
      x,
      y,
      isHighlighted,
      isFinalState,
      isSnap,
      isDebug,
      onClick,
      onDoubleClick,
      onDragStart,
      onDragStop,
      onDrag
    } = this.props;

    // const finalStateCircle = isFinalState ? (
    //   <path
    //     d={getCirclePath(x, y, radius - radius / 10)}
    //     fill="none"
    //     stroke={color}
    //     strokeWidth={lineWidth}
    //   />
    // ) : null;

    // const circlePoints = this.circlePathElement ? pathToPoints(this.circlePathElement, 32) : null;
    // const segmentedCircle = circlePoints ? pointsToPath(circlePoints, true) : null;

    // const debugPath = isDebug ? (
    //   <path
    //     d={segmentedCircle}
    //     fill="none"
    //     stroke={'#0ff'}
    //     strokeWidth={lineWidth}
    //   />
    // ) : null;
    // if(isDebug) {
    //   console.log(`StateNode ${name}`, this);
    // }

    const labelElementBBox = this.state.labelElement && this.state.labelElement.getBBox();
    const width = labelElementBBox && labelElementBBox.width;
    const height = labelElementBBox && labelElementBBox.height;

    return (
      <DraggableCore
        grid={isSnap ? [snapGridStep, snapGridStep] : null}
        onStart={this.handleStart.bind(this)}
        onStop={this.handleStop.bind(this)}
        onDrag={this.handleDrag.bind(this)}
      >
        <g>
          <rect
            x={x - width / 2 - padding / 2}
            y={y - height / 2 - padding / 2}
            rx="4"
            ry="4"
            width={width + padding}
            height={height + padding}
            fill={bgColor}
            strokeWidth={lineWidth}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onDrag={() => console.log('drag')}
          />
          <text
            x={x}
            y={y}
            fontSize="16"
            alignmentBaseline="middle"
            textAnchor="middle"
            fill={textColor}
            ref={this.handleLabelElementRef.bind(this)}
          >
            {name}
          </text>
        </g>
      </DraggableCore>
    );
  }
}

StateNode.propTypes = propTypes;
StateNode.defaultProps = defaultProps;
