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
    <BezierTransition
      input="Transition_0"
      isHighlighted={true}
      isSnap={false}
      bezier={_scope.state.bezier}
      isShowBezierHelpers={true}
      arrowPosition={2}
      onBezierChange={_scope.handleBezierChange.bind(_scope)}
    />
  </svg>
</div>
```

### Component Name

BezierTransition

### License

Licensed by © 2017 OpusCapita
