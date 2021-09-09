// 从一个有序数组中找到目标值
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

/**
 * 找到arr中第一个比target大的数的idx
 */
function findLarge(arr, target) {
  let l = 0,
    r = arr.length - 1,
    idx = -1
  while (l <= r) {
    const mid = (l + r) >> 1
    if (arr[mid] < target) {
      idx = mid
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  return idx + 1
}

/**
 * arr中查找target
 */
function findEqual(arr, target) {
  let l = 0,
    r = arr.length - 1
  while (l <= r) {
    const mid = (l + r) >> 1
    if (arr[mid] === target) return mid
    else if (arr[mid] > target) r = mid - 1
    else l = mid + 1
  }
  return -1
}
