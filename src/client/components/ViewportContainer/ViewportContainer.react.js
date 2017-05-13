import React, { Component, PropTypes } from 'react';
import Viewport from '../Viewport';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';

const scaleFactor = 0.0006;
const minScale = 0.1;
const maxScale = 5;
const gridSize = 10;

const propTypes = {
  cursorPosition: PropTypes.object,
  viewportRect: PropTypes.object,
  viewportScale: PropTypes.number,
  viewportPanOffset: PropTypes.object
};

@connect(
  state => ({
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportPanOffset: state.viewport.viewportPanOffset
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

    // TODO
    // const x = this.props.viewportPanOffset.x / (scale - this.props.viewportScale);
    // const y = this.props.viewportPanOffset.y / (scale - this.props.viewportScale);
    // this.props.actions.updateViewportPanOffset({ x, y });
  }

  handleMouseMove(e, mousePosition) {
    this.props.actions.updateCursorPosition(mousePosition);
  }

  handleMouseLeave(e, mousePosition) {
    this.props.actions.updateCursorPosition(mousePosition);
  }

  handlePan(e, draggableData) {
    let x = this.props.viewportPanOffset.x + draggableData.deltaX / this.props.viewportScale;
    let y = this.props.viewportPanOffset.y + draggableData.deltaY / this.props.viewportScale;
    this.props.actions.updateViewportPanOffset({ x, y });
  }

  render() {
    const {
      viewportScale,
      viewportPanOffset
    } = this.props;

    return (
      <Viewport
        scale={viewportScale}
        gridSize={gridSize}
        onWheel={this.handleWheel.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onPan={this.handlePan.bind(this)}
        panOffsetX={viewportPanOffset.x}
        panOffsetY={viewportPanOffset.y}
      >
        {null}
      </Viewport>
    );
  }
}

ViewportContainer.propTypes = propTypes;
