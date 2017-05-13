import React, { Component, PropTypes } from 'react';
import StatusLine from '../StatusLine';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';

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
export default class StatusLineContainer extends Component {
  handleZoomClick(e) {
    this.props.actions.updateViewportScale(1);
  }

  render() {
    const {
      cursorPosition,
      viewportRect,
      viewportScale
    } = this.props;

    return (
      <StatusLine
        mousePositionX={cursorPosition.x}
        mousePositionY={cursorPosition.y}
        viewportScale={viewportScale}
        onZoomClick={this.handleZoomClick.bind(this)}
      />
    );
  }
}

StatusLineContainer.propTypes = propTypes;
