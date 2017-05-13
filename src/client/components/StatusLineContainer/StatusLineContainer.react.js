import React, { Component, PropTypes } from 'react';
import StatusLine from '../StatusLine';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
  })
)
export default class StatusLineContainer extends Component {
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
      />
    );
  }
}

StatusLineContainer.propTypes = propTypes;
