import React, { Component, PropTypes } from 'react';
import StatusLine from '../StatusLine';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';

const propTypes = {
  cursorPosition: PropTypes.object,
  viewportRect: PropTypes.object,
  viewportScale: PropTypes.number,
  viewportPanOffset: PropTypes.object,
  showGrid: PropTypes.bool
};

@connect(
  state => ({
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportPanOffset: state.viewport.viewportPanOffset,
    showGrid: state.viewport.showGrid
  }),
  dispatch => ({ actions: bindActionCreators(viewportActions, dispatch) })
)
export default class StatusLineContainer extends Component {
  handleZoomClick(e) {
    this.props.actions.updateViewportScale(1);
  }

  handleGridButtonClick(e) {
    this.props.actions.updateViewportShowGrid(!this.props.showGrid);
  }

  render() {
    const {
      cursorPosition,
      viewportRect,
      viewportScale,
      viewportPanOffset,
      showGrid
    } = this.props;

    const isOutOfViewport = (
      cursorPosition.x < 0 ||
      cursorPosition.y < 0 ||
      cursorPosition.x > 10000 || // 10000 - viewport size. TODO - move it to configurable options
      cursorPosition.y > 10000
    );

    return (
      <StatusLine
        mousePositionX={isOutOfViewport ? null : cursorPosition.x}
        mousePositionY={isOutOfViewport ? null : cursorPosition.y}
        viewportScale={viewportScale}
        isShowGrid={showGrid}
        onZoomClick={this.handleZoomClick.bind(this)}
        onGridButtonClick={this.handleGridButtonClick.bind(this)}
      />
    );
  }
}

StatusLineContainer.propTypes = propTypes;
