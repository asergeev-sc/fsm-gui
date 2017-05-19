import React, { Component, PropTypes } from 'react';
import Viewport from '../Viewport';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';
import { ITEM_TYPES, updateSelectedItem } from '../App/redux/reducer/selected-item';

// TODO remove debug helpers
import BezierTransition from '../BezierTransition';
import StateNode from '../StateNode';
// const debugViewportChildren = [
//   (
//     <g key="group">
//       <BezierTransition
//         input="Transition_0"
//         isHighlighted={true}
//         isSnap={false}
//         bezier={[100,25 , 10,90 , 110,100 , 150,195]}
//         isShowBezierHelpers={true}
//         arrowPosition={2}
//         onBezierChange={() => {}}
//         key="Transition_0"
//       />
//       <StateNode
//         name="State_0"
//         code="0"
//         x={300}
//         y={300}
//         isFinalState={true}
//         isHighlighted={true}
//         isSnap={false}
//         onClick={() => console.log('onClick')}
//         onDoubleClick={() => console.log('onDoubleClick')}
//         onDragStart={(e, data) => console.log('DragStart', e, data)}
//         onDragStop={(e, data) => console.log('DragStop', e, data)}
//         onDrag={() => {}}
//         key="State_0"
//       />
//     </g>
//   )
// ];

const scaleFactor = 0.06;
const minScale = 0.1;
const maxScale = 5;
const gridSize = 10;

const propTypes = {
  cursorPosition: PropTypes.object,
  viewportRect: PropTypes.object,
  viewportScale: PropTypes.number,
  viewportPanOffset: PropTypes.object,
  showGrid: PropTypes.bool,
  stateNodes: PropTypes.object,
  selectedItemType: PropTypes.string,
  selectedItemId: PropTypes.string
};

@connect(
  state => ({
    cursorPosition: state.viewport.cursorPosition,
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportPanOffset: state.viewport.viewportPanOffset,
    showGrid: state.viewport.showGrid,
    stateNodes: state.stateNodes,
    selectedItemType: state.selectedItem.itemType,
    selectedItemId: state.selectedItem.itemId
  }),
  dispatch => ({ actions: bindActionCreators({ ...viewportActions, updateSelectedItem }, dispatch) })
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
    if(this.props.selectedItemType === ITEM_TYPES.VIEWPORT) {
      let x = this.props.viewportPanOffset.x + draggableData.deltaX / this.props.viewportScale;
      let y = this.props.viewportPanOffset.y + draggableData.deltaY / this.props.viewportScale;
      this.props.actions.updateViewportPanOffset({ x, y });
    }
  }

  handleStateNodeMouseDown(e, key) {
    this.props.actions.updateSelectedItem(ITEM_TYPES.STATE, key);
  }

  handleStateNodeClick(e, key) {
    this.props.actions.updateSelectedItem(ITEM_TYPES.STATE, key);
  }

  handleMouseDown(e) {
    this.props.actions.updateSelectedItem(ITEM_TYPES.VIEWPORT);
  }

  handleClick(e) {
    this.props.actions.updateSelectedItem(ITEM_TYPES.VIEWPORT);
  }

  render() {
    const {
      viewportScale,
      viewportPanOffset,
      showGrid,
      stateNodes
    } = this.props;

    const stateNodesElements = Object.keys(stateNodes).map(stateNodeKey => {
      const stateNode = stateNodes[stateNodeKey];
      return (
        <StateNode
          key={stateNodeKey}
          name={stateNode.name}
          x={stateNode.gui.points[0]}
          y={stateNode.gui.points[1]}
          isFinalState={false}
          isHighlighted={false}
          isSnap={false}
          onMouseDown={(e) => this.handleStateNodeMouseDown.call(this, e, stateNodeKey)}
          onClick={(e) => this.handleStateNodeClick.call(this, e, stateNodeKey)}
          onDoubleClick={() => console.log('onDoubleClick')}
          onDragStart={(e, data) => console.log('DragStart', e, data)}
          onDragStop={(e, data) => console.log('DragStop', e, data)}
          onDrag={() => {}}
        />
      );
    });

    return (
      <Viewport
        scale={viewportScale}
        gridSize={gridSize}
        isShowGrid={showGrid}
        onWheel={this.handleWheel.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onPan={this.handlePan.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onClick={this.handleClick.bind(this)}
        panOffsetX={viewportPanOffset.x}
        panOffsetY={viewportPanOffset.y}
      >
        {stateNodesElements}
      </Viewport>
    );
  }
}

ViewportContainer.propTypes = propTypes;
