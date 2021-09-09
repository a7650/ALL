function LIS(arr) {
  const cache = [arr[0]]
  let len = 1
  const dp = [1]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > cache[len - 1]) {
      cache[len] = arr[i]
      len++
      dp[i] = len
    } else {
      let l = 0,
        r = len - 1,
        idx = -1
      while (l <= r) {
        const mid = (l + r) >> 1
        if (cache[mid] < arr[i]) {
          idx = mid
          l = mid + 1
        } else {
          r = mid - 1
        }
      }
      idx += 1
      cache[idx] = arr[i]
      dp[i] = idx + 1
    }
  }
  const ret = []
  for (let i = arr.length - 1, j = len; j > 0; i--) {
    if (dp[i] === j) {
      ret[--j] = arr[i]
    }
  }
  return ret
}
