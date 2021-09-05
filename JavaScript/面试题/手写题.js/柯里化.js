function curry(fn, ...args) {
  const len = fn.length
  let finalArgs = [...args]
  const res = (...args) => {
    finalArgs = [...finalArgs, ...args]
    console.log(finalArgs)
    if (finalArgs.length >= len) return fn(...finalArgs)
    return res
  }
  return res
}

const a = (a, b, c) => console.log(a, b, c)
const _a = curry(a, 1)

_a(2)
console.log(_a(3))
