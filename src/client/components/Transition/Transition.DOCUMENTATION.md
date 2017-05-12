### Synopsis

Transition is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| demoProp                       | string                  | Write a description of the property                         |

### Code Example

```
<div style={{ widht: '640px', height: '480px', outline: '1px solid #333' }}>
  <svg
    version="1.1"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Transition
      input="Transition_0"
      isHighlighted={true}
      isSnap={false}
      onClick={() => console.log('onClick')}
      bezier={_scope.state.bezier}
      isShowBezierHelpers={true}
  
      onBezierChange={_scope.handleBezierChange.bind(_scope)}
      onDoubleClick={() => console.log('onDoubleClick')}
    />
  </svg>
</div>
```

### Component Name

Transition

### License

Licensed by © 2017 OpusCapita

