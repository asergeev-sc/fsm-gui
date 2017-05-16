import React, { Component, PropTypes } from 'react';
import Toolbar from '../Toolbar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';

const propTypes = {};

@connect(
  state => ({
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportPanOffset: state.viewport.viewportPanOffset
  }),
  dispatch => ({ actions: bindActionCreators(viewportActions, dispatch) })
)
export default class ToolbarContainer extends Component {
  render() {
    return (
      <Toolbar />
    );
  }
}

ToolbarContainer.propTypes = propTypes;
