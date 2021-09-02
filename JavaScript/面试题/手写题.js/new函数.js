function newFn(...args) {
  const fn = args.shift()
  const target = Object.create(fn.prototype)
  const ret = fn.apply(target, args)
  const type = typeof ret
  if (type === 'function' || (type === 'object' && ret !== null)) return ret
  return target
}
