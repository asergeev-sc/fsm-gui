export function getCirclePath(cx, cy, r) {
  // See original solution here: https://codepen.io/jakob-e/pen/bgBegJ
  const d = `M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
  return d;
}

export function pathToPoints(path, samples) {
  let points = [];
  for (let i = 1; i <= samples; i += 1) {
	  const point = path.getPointAtLength(i / samples * path.getTotalLength());
    points.push(point);
  }
  return points;
}

export function pointsToPath(points, closePath) {
  let path = "";
  for(let i = 0; i < points.length; i += 1 ) {
    path += (i && "L " || "M ") + points[i].x + ',' + points[i].y + ' ';
  }
  if(closePath) {
    path += 'Z';
  }
  return path;
}
