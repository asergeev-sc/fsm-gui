import React, { Component, PropTypes } from 'react';
import Viewport from '../Viewport';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';

const scaleFactor = 0.0012;
const minScale = 0.01;
const maxScale = 5;
const gridSize = 8;

const propTypes = {
  cursorPosition: PropTypes.object,
  viewportRect: PropTypes.object,
  viewportScale: PropTypes.number
};

@connect(
  state => ({
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale
  }),
  dispatch => ({ actions: bindActionCreators(viewportActions, dispatch) })
)
export default class ViewportContainer extends Component {
  handleWheel(e) {
    let scale = this.props.viewportScale - e.deltaY * scaleFactor;
    if(scale < minScale) {
      scale = minScale;
    }
    if(scale > maxScale) {
      scale = maxScale;
    }
    this.props.actions.updateViewportScale(scale);
  }

  handleMouseMove(e, mousePosition) {
    this.props.actions.updateCursorPosition(mousePosition);
  }

  handleMouseLeave(e, mousePosition) {
    this.props.actions.updateCursorPosition(mousePosition);
  }

  render() {
    const {
      viewportScale
    } = this.props;

    return (
      <Viewport
        scale={viewportScale}
        gridSize={viewportScale > 0.2 ? gridSize : 0 }
        onWheel={this.handleWheel.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        {null}
      </Viewport>
    );
  }
}

ViewportContainer.propTypes = propTypes;
