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

export function getDistance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.sqrt( a*a + b*b );
}

export function snapToPoints(bezier, points, xIndex, yIndex) {
  // points - { x: nubmer, y: number }
  const distances = points.map(
    point => getDistance(bezier[xIndex], bezier[yIndex], point.x, point.y)
  );
  const minimalDistance = Math.min(...distances);

  if(minimalDistance > this.props.stickyDistance) {
    return bezier;
  }

  const snapPointIndex = distances.indexOf(minimalDistance);
  const pointToSnap = snapPointIndex === -1 ? null : this.props.stickyPoints[snapPointIndex];

  if(pointToSnap !== null) {
    bezier[xIndex] = pointToSnap.x;
    bezier[yIndex] = pointToSnap.y;
  }

  return bezier;
}
