import React, { Component, PropTypes } from 'react';
import StatusLine from '../StatusLine';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';

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
export default class StatusLineContainer extends Component {
  handleZoomClick(e) {
    this.props.actions.updateViewportScale(1);
  }

  render() {
    const {
      cursorPosition,
      viewportRect,
      viewportScale,
      viewportPanOffset
    } = this.props;

    const mousePositionX = cursorPosition.x - viewportPanOffset.x;
    const mousePositionY = cursorPosition.y - viewportPanOffset.y;
    const isOutOfViewport = mousePositionX < 0 || mousePositionY < 0;

    return (
      <StatusLine
        mousePositionX={isOutOfViewport ? null : mousePositionX}
        mousePositionY={isOutOfViewport ? null : mousePositionY}
        viewportScale={viewportScale}
        onZoomClick={this.handleZoomClick.bind(this)}
      />
    );
  }
}

StatusLineContainer.propTypes = propTypes;
