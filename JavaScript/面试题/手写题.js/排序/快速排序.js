function sort(arr) {
  const len = arr.length
  if (len <= 1) return arr
  const bp = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < len; i++) {
    if (arr[i] < bp) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return sort(left).concat(bp, sort(right))
}

console.log(sort([5, 4, 3, 2, 1, 6]))
