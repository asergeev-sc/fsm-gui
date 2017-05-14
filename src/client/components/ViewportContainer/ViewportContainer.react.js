import React, { Component, PropTypes } from 'react';
import Viewport from '../Viewport';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';


// TODO remove debug helpers
import Transition from '../Transition';
import StateNode from '../StateNode';
const debugViewportChildren = [
  (
    <g key="group">
      <Transition
        input="Transition_0"
        isHighlighted={true}
        isSnap={false}
        bezier={[100,25 , 10,90 , 110,100 , 150,195]}
        isShowBezierHelpers={true}
        arrowPosition={2}
        onBezierChange={() => {}}
        key="Transition_0"
      />
      <StateNode
        name="State_0"
        code="0"
        x={300}
        y={300}
        isFinalState={true}
        isHighlighted={true}
        isSnap={false}
        onClick={() => console.log('onClick')}
        onDoubleClick={() => console.log('onDoubleClick')}
        onDragStart={(e, data) => console.log('DragStart', e, data)}
        onDragStop={(e, data) => console.log('DragStop', e, data)}
        onDrag={() => {}}
        key="State_0"
      />
    </g>
  )
];

const scaleFactor = 0.06;
const minScale = 0.1;
const maxScale = 5;
const gridSize = 10;

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
export default class ViewportContainer extends Component {
  handleWheel(e) {
    let scale = e.deltaY > 0 ?
      this.props.viewportScale - scaleFactor :
      this.props.viewportScale + scaleFactor;
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

  handlePan(e, draggableData) {
    let x = this.props.viewportPanOffset.x + draggableData.deltaX / this.props.viewportScale;
    let y = this.props.viewportPanOffset.y + draggableData.deltaY / this.props.viewportScale;
    this.props.actions.updateViewportPanOffset({ x, y });
  }

  render() {
    const {
      viewportScale,
      viewportPanOffset,
      showGrid
    } = this.props;

    return (
      <Viewport
        scale={viewportScale}
        gridSize={gridSize}
        isShowGrid={showGrid}
        onWheel={this.handleWheel.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onPan={this.handlePan.bind(this)}
        panOffsetX={viewportPanOffset.x}
        panOffsetY={viewportPanOffset.y}
      >
        {debugViewportChildren}
      </Viewport>
    );
  }
}

ViewportContainer.propTypes = propTypes;
