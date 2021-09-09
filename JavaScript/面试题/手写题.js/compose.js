const compose = function (fns) {
  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}

const a = (n) => {
  console.log('a', n)
  return n + 1
}
const b = (n) => {
  console.log('b', n)
  return n + 1
}
const c = (n) => {
  console.log('c', n)
  return n + 1
}
const d = (n) => {
  console.log('d', n)
  return n + 1
}

compose([a, b, c, d])(2)
