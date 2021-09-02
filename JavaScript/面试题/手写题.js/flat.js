function flat(arr, n) {
  if (n <= 0) return arr
  const ret = []
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      ret.push(...flat(item, n - 1))
    } else {
      ret.push(item)
    }
  })
  return ret
}

Array.prototype._flat = function (n = Infinity) {
  return flat(this, n)
}

///////////////////////////////////////

Array.prototype._flat2 = function () {
  const arr = [...this]
  const ret = []
  while (arr.length) {
    const item = arr.shift()
    if (Array.isArray(item)) {
      arr.unshift(...item)
    } else {
      ret.push(item)
    }
  }
  return ret
}

console.log([1, 2, 3, 4, 5, [6, 7, 8, [9, 1, 2, 3, [4]]]]._flat2())
