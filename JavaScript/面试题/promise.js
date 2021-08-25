try {
  module.exports = Promise
} catch (e) {}

function Promise(executor) {
  var self = this

  self.status = 'pending'
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function () {
      // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function () {
      // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  var self = this
  var promise2

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved =
    typeof onResolved === 'function' ? onResolved : function (value) {}
  onRejected =
    typeof onRejected === 'function' ? onRejected : function (reason) {}

  if (self.status === 'resolved') {
    return (promise2 = new Promise(function (resolve, reject) {
      try {
        var x = onResolved(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        }
        resolve(x)
      } catch (e) {
        reject(e)
      }
    }))
  }

  if (self.status === 'rejected') {
    return (promise2 = new Promise(function (resolve, reject) {
      try {
        var x = onRejected(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    }))
  }

  if (self.status === 'pending') {
    return (promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
}

// 为了下文方便，我们顺便实现一个catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.prototype.finally = function (f) {
  return this.then(
    function (value) {
      return Promise.resolve(f()).then(function () {
        return value
      })
    },
    function (err) {
      return Promise.resolve(f()).then(function () {
        throw err
      })
    }
  )
}

Promise.prototype.all = function (cbs) {
  return new Promise((resolve, reject) => {
    const ret = []
    let count = cbs.length
    function res(value, idx) {
      if (value instanceof Promise && typeof value.then === 'function') {
        value.then((_value) => {
          ret[idx] = _value
          count--
          if (count <= 0) {
            resolve(ret)
          }
        }, reject)
      } else {
        res(Promise.resolve(value), idx)
      }
    }
    cbs.forEach(res)
  })
}
