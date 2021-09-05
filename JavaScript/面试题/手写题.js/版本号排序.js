function isLarge(a, b) {
  a = a.split('.')
  b = b.split('.')
  let idx = 0
  const max = Math.max(a.length, b.length)
  while (idx < max) {
    const an = Number(a[idx] || 0)
    const bn = Number(b[idx] || 0)
    // console.log(an, bn)
    if (an > bn) return true
    if (an < bn) return false
    idx++
  }
  return false
}

function versionSort(arr) {
  return arr.sort((a, b) => (isLarge(a, b) ? -1 : 1))
}

// console.log(isLarge('2.3.3', '0.1.1'))
console.log(
  versionSort(['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'])
)
