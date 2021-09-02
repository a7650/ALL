function search(arr, target, start, end) {
  let targetIndex = -1

  let mid = Math.floor((start + end) / 2)

  if (arr[mid] === target) {
    targetIndex = mid
    return targetIndex
  }

  if (start >= end) {
    return targetIndex
  }

  if (arr[mid] < target) {
    return search(arr, target, mid + 1, end)
  } else {
    return search(arr, target, start, mid - 1)
  }
}
