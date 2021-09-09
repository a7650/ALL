function deepCopy(obj) {
  return _deepcopy(obj, new WeakMap())
}

function _deepcopy(obj, hash) {
  if (typeof obj !== 'object') return obj
  if (hash.has(obj)) return hash.get(obj)
  if (Array.isArray(obj)) return obj.map((i) => _deepcopy(i, hash))
  const cloneObj = Object.create(obj.constructor && obj.constructor.prototype)
  hash.set(obj, cloneObj)
  const keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]
  for (let key of keys) {
    cloneObj[key] = _deepcopy(obj[key], hash)
  }
  return cloneObj
}

function getEmpty(o) {
  const type = Object.prototype.toString.call(o)
  if (type === '[object Array]') return []
  if (type === '[object Object]') return {}
  return o
}

function deepCloneBfs(data) {
  const cache = new WeakMap()
  const queue = []
  const tar = getEmpty(data)
  if (tar !== data) {
    queue.push([data, tar])
    cache.set(data, tar)
  }
  while (queue.length) {
    const [ori, tar] = queue.shift()
    for (let key in ori) {
      if (cache.has(ori[key])) {
        tar[key] = cache.get(ori[key])
        continue
      }
      tar[key] = getEmpty(ori[key])
      if (tar.key !== ori[key]) {
        queue.push([ori[key], tar[key]])
        cache.set(ori[key], tar[key])
      }
    }
  }
  return tar
}
