import React, { Component, PropTypes } from 'react';
import './StatusLine.less';

const propTypes = {
  mousePositionX: PropTypes.number,
  mousePositionY: PropTypes.number,
  viewportScale: PropTypes.number
};

const maxValueLength = 6;

export default
class StatusLine extends Component {
  render() {
    const {
      mousePositionX,
      mousePositionY,
      viewportScale
    } = this.props;

    return (
      <div className="fsm--status-line">
        <div className="fsm--status-line__scale">
          <div className="fsm--status-line__label">
            Zoom:
          </div>
          <div className="fsm--status-line__value">
            {viewportScale.toString().slice(0, 4)}
          </div>
        </div>
        <div className="fsm--status-line__mouse-position">
          <div className="fsm--status-line__label">
            X:
          </div>
          <div className="fsm--status-line__value">
            {typeof mousePositionX === 'number' ? mousePositionX.toString().slice(0, maxValueLength) : '―'}
          </div>
          <div className="fsm--status-line__label">
            Y:
          </div>
          <div className="fsm--status-line__value">
            {typeof mousePositionY === 'number' ? mousePositionY.toString().slice(0, maxValueLength) : '―'}
          </div>
        </div>
      </div>
    );
  }
}

StatusLine.propTypes = propTypes;
