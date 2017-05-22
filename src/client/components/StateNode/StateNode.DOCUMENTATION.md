### Synopsis

StateNode is 
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
  <StateNode
    label="State_0"
    code="0"
    x={_scope.state.x}
    y={_scope.state.y}
    isFinalState={true}
    selected={true}
    onClick={() => console.log('onClick')}
    onDoubleClick={() => console.log('onDoubleClick')}
    onDragStart={(e, data) => console.log('DragStart', e, data)} 
    onDragStop={(e, data) => console.log('DragStop', e, data)} 
    onDrag={_scope.handleDrag.bind(_scope)} 
  />
</svg>

```

### Component Name

StateNode

### License

Licensed by © 2017 OpusCapita

