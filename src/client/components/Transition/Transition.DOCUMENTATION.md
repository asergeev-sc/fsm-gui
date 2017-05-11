### Synopsis

Transition is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| demoProp                       | string                  | Write a description of the property                         |

### Code Example

```
<svg
  version="1.1"
  width="100%"
  height="100%"
  xmlns="http://www.w3.org/2000/svg"
>
  <Transition
    name="Transition_0"
    isHighlighted={true}
    isSnap={false}
    onClick={() => console.log('onClick')}
    onDoubleClick={() => console.log('onDoubleClick')}

    x1={_scope.state.x1}
    y1={_scope.state.y1}
    x2={_scope.state.x2}
    y2={_scope.state.y2}
    
    onDragStart={(e, data) => console.log('DragStart', e, data)} 
    onDragStop={(e, data) => console.log('DragStop', e, data)} 
    onDrag={_scope.handleDrag.bind(_scope)}
    
    onDot1DragStart={(e, data) => console.log('Dot1 DragStart', e, data)} 
    onDot1DragStop={(e, data) => console.log('Dot1 DragStop', e, data)} 
    onDot1Drag={(e, data) => console.log('Dot1 Drag', e, data)}
    
    onDot1DragStart={(e, data) => console.log('Dot2 DragStart', e, data)} 
    onDot1DragStop={(e, data) => console.log('Dot2 DragStop', e, data)} 
    onDot1Drag={(e, data) => console.log('Dot2 Drag', e, data)} 
  />
</svg>
```

### Component Name

Transition

### License

Licensed by © 2017 OpusCapita

