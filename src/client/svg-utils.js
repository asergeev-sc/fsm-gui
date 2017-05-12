export function getCirclePath(cx, cy, r) {
  // See original solution here: https://codepen.io/jakob-e/pen/bgBegJ
  const d = `M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
  return d;
}
