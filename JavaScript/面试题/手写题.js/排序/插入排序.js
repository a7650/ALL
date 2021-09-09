function sort(arr) {
  const len = arr.length
  for (let i = 1; i < len; i++){
    const tmp = arr[i]
    let j = i
    while (j > 0 && arr[j - 1] > tmp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = tmp
  }
  return arr
}

console.log(sort([5,4,3,2,1,6]))
