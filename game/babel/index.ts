function getShapes() {
  const result = [
    { kind: 'circle', radius: 100 },
    { kind: 'square', sideLength: 50 }
  ] as const
  return result
}
for (const shape of getShapes()) {
  // Narrows perfectly!
  if (shape.kind === 'circle') {
    console.log('Circle radius', shape.radius)
  } else {
    console.log('Square side length', shape.sideLength)
  }
}
