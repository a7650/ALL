function deepCopy(target, cache = new Set()) {
  if (typeof target !== 'object' || cache.has(target)) {
    return target
  }
  if (Array.isArray(target)) {
    target.map((t) => {
      cache.add(t)
      return t
    })
  } else {
    return [
      ...Object.keys(target),
      ...Object.getOwnPropertySymbols(target)
    ].reduce(
      (res, key) => {
        cache.add(target[key])
        res[key] = deepCopy(target[key], cache)
        return res
      },
      target.constructor !== Object
        ? Object.create(target.constructor.prototype)
        : {}
    )
  }
}

function deepCopy2(obj, hash = new WeakMap()) {
  if (hash.has(obj)) return hash.get(obj) || 'this obj has cloned already'
  let cloneObj = Array.isArray(obj) ? [] : {}
  hash.set(obj, cloneObj)
  for (let key in obj) {
    cloneObj[key] =
      typeof obj[key] == 'object' ? deepCopy(obj[key], hash) : obj[key]
  }
  return cloneObj
}

function deepCopy3(obj) {
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

function deepCloneBfs(data) {
  var obj = {}
  var originQueue = [data]
  var copyQueue = [obj]
  //以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
  var visitQueue = []
  var copyVisitQueue = []
  while (originQueue.length > 0) {
    var _data = originQueue.shift()
    var _obj = copyQueue.shift()
    visitQueue.push(_data)
    copyVisitQueue.push(_obj)
    for (var key in _data) {
      var _value = _data[key]
      if (typeof _value !== 'object') {
        _obj[key] = _value
      } else {
        //使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
        var index = visitQueue.indexOf(_value)
        if (index >= 0) {
          // 出现环的情况不需要再取出遍历
          _obj[key] = copyVisitQueue[index] || 'this obj has cloned already'
        } else {
          originQueue.push(_value)
          _obj[key] = {}
          copyQueue.push(_obj[key])
        }
      }
    }
  }
  return obj
}
