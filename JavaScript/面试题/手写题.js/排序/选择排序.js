function sort(arr) {
  const len = arr.length
  let minIdx
  for (let i = 0; i < len; i++) {
    minIdx = i
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    if (minIdx !== i) {
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    }
  }
  return arr
}

console.log(sort([5,4,3,2,1,6]))
