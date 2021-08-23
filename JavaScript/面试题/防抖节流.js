function debounce(fn, delay = 300) {
  let timer
  return function (...args) {
    const self = this
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(self, args)
    }, delay)
  }
}

function throttle(fn, delay = 300) {
  let lstTime = 0
  return function (...args) {
    if (Date.now() - lstTime < delay) return
    lstTime = Date.now()
    fn.apply(this, args)
  }
}

