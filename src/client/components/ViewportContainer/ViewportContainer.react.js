import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import isEqual from 'lodash/isEqual';
import Viewport from '../Viewport';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewportActions from '../App/redux/reducer/viewport';
import * as selectedItemActions from '../App/redux/reducer/selected-item';
import * as stateNodesActions from '../App/redux/reducer/state-nodes';
import * as transitionsActions from '../App/redux/reducer/transitions';
import { ITEM_TYPES } from '../App/redux/reducer/selected-item';

// TODO remove debug helpers
import BezierTransition from '../BezierTransition';
import StateNode from '../StateNode';
// const debugViewportChildren = [
//   (
//     <g key="group">
//       <BezierTransition
//         input="Transition_0"
//         highlighted={true}
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
//         finalState={true}
//         highlighted={true}
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
  viewportRect: PropTypes.object,
  viewportScale: PropTypes.number,
  viewportPanOffset: PropTypes.object,
  showGrid: PropTypes.bool,
  stateNodes: PropTypes.object,
  transitions: PropTypes.object,
  selectedItemType: PropTypes.string,
  selectedItemId: PropTypes.string,
  hoveredStateNode: PropTypes.string
};

@connect(
  state => ({
    viewportRect: state.viewport.viewportRect,
    viewportScale: state.viewport.viewportScale,
    viewportPanOffset: state.viewport.viewportPanOffset,
    showGrid: state.viewport.showGrid,
    stateNodes: state.stateNodes,
    transitions: state.transitions,
    selectedItemType: state.selectedItem.itemType,
    selectedItemId: state.selectedItem.itemId,
    hoveredStateNode: state.selectedItem.hoveredStateNode
  }),
  dispatch => ({ actions: bindActionCreators({
    ...viewportActions, ...selectedItemActions, ...stateNodesActions, ...transitionsActions
  }, dispatch) })
)
export default class ViewportContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panning: false
    };

    this.handleWheel = this.handleWheel.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handlePan = this.handlePan.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStateNodeClick = this.handleStateNodeClick.bind(this);
    this.handleStateNodeMouseDown = this.handleStateNodeMouseDown.bind(this);
    this.handleStateNodeMouseEneter = this.handleStateNodeMouseEnter.bind(this);
    this.handleStateNodeMouseLeave = this.handleStateNodeMouseLeave.bind(this);
    this.handleStateNodeDrag = this.handleStateNodeDrag.bind(this);
    this.handleTransitionChange = this.handleTransitionChange.bind(this);
    this.handleTransitionMouseDown = this.handleTransitionMouseDown.bind(this);
  }

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
    if(this.state.panning) {
      let x = this.props.viewportPanOffset.x + draggableData.deltaX / this.props.viewportScale;
      let y = this.props.viewportPanOffset.y + draggableData.deltaY / this.props.viewportScale;
      this.props.actions.updateViewportPanOffset({ x, y });
    }
  }

  handleStateNodeMouseDown(e, key) {
    e.stopPropagation();
    this.props.actions.updateSelectedItem(ITEM_TYPES.STATE, key);
  }

  handleStateNodeClick(e, key) {
    this.props.actions.updateSelectedItem(ITEM_TYPES.STATE, key);
  }

  handleStateNodeMouseEnter(e, key) {
    this.props.actions.updateHoveredStateNode(key);
  }

  handleStateNodeMouseLeave(e, key) {
    this.props.actions.updateHoveredStateNode(null);
  }

  handleMouseDown(e) {
    this.mouseDownX = e.clientX;
    this.mouseDownY = e.clientY;

    this.setState({ panning: true });
  }

  handleStateNodeDrag(e, data, stateNodeKey) {
    const stateNode = this.props.stateNodes[stateNodeKey];
    const points = [
      stateNode.points[0] + data.deltaX / this.props.viewportScale,
      stateNode.points[1] + data.deltaY / this.props.viewportScale
    ];
    const updatedStateNode = Object.assign({}, stateNode, { points });
    this.props.actions.updateStateNode(stateNodeKey, updatedStateNode);
  }

  handleTransitionChange(transitionKey, points, d) {
    const transition = this.props.transitions[transitionKey];
    const updatedTransition = Object.assign({}, transition, { points });
    this.props.actions.updateTransition(transitionKey, updatedTransition);
  }

  handleTransitionMouseDown(e, key) {
    e.stopPropagation();
    this.props.actions.updateSelectedItem(ITEM_TYPES.TRANSITION, key);
  }

  handleMouseUp(e) {
    const cursorHasMoved = Math.abs(this.mouseDownX - e.clientX) > 0 || Math.abs(this.mouseDownY - e.clientY) > 0;

    if(!cursorHasMoved) {
      this.props.actions.updateSelectedItem(ITEM_TYPES.VIEWPORT);
    }

    this.setState({ panning: false });
  }

  handleClick(e) {
    return e;
  }

  render() {
    const {
      viewportScale,
      viewportPanOffset,
      showGrid,
      stateNodes,
      transitions,
      hoveredStateNode,
      selectedItemType,
      selectedItemId
    } = this.props;

    const stateNodesElements = Object.keys(stateNodes).map(stateNodeKey => {
      const stateNode = stateNodes[stateNodeKey];
      const selected = selectedItemType === ITEM_TYPES.STATE && selectedItemId === stateNodeKey;
      const showPoints = hoveredStateNode === stateNodeKey || selected;

      return (
        <StateNode
          key={stateNodeKey}
          label={stateNode.name}
          x={stateNode.points[0]}
          y={stateNode.points[1]}
          bgColor={stateNode.bgColor}
          textColor={stateNode.textColor}
          finalState={false}
          selected={selected}
          showPoints={showPoints}
          onMouseEnter={(e) => this.handleStateNodeMouseEnter(e, stateNodeKey)}
          onMouseLeave={(e) => this.handleStateNodeMouseLeave(e, stateNodeKey)}
          onMouseDown={(e) => this.handleStateNodeMouseDown(e, stateNodeKey)}
          onClick={(e) => this.handleStateNodeClick(e, stateNodeKey)}
          onDoubleClick={() => console.log('onDoubleClick')}
          onDragStart={(e, data) => console.log('DragStart', e, data)}
          onDragStop={(e, data) => console.log('DragStop', e, data)}
          onDrag={(e, data) => this.handleStateNodeDrag(e, data, stateNodeKey)}
        />
      );
    });

    const transitionsElements = Object.keys(transitions).map(transitionKey => {
      const transition = transitions[transitionKey];
      const selected = selectedItemType === ITEM_TYPES.TRANSITION && selectedItemId === transitionKey;
      return (
        <BezierTransition
          key={transitionKey}
          label={transition.name}
          bezier={transition.points}
          lineWidth={4}
          color="#0277bd"
          pointSize={12}
          onChange={(bezierPoints, d) => this.handleTransitionChange(transitionKey, bezierPoints, d)}
          onMouseDown={(e) => this.handleTransitionMouseDown(e, transitionKey)}
          selected={selected}
        />
      );
    });

    return (
      <Viewport
        scale={viewportScale}
        gridSize={gridSize}
        showGrid={showGrid}
        onWheel={this.handleWheel}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        onPan={this.handlePan}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
        panOffsetX={viewportPanOffset.x}
        panOffsetY={viewportPanOffset.y}
      >
        {transitionsElements}
        {stateNodesElements}
      </Viewport>
    );
  }
}

ViewportContainer.propTypes = propTypes;
