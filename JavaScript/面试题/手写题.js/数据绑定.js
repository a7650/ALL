function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  this.$options = options
  initState(options, this)
  this.$mount()
}

Vue.prototype.$mount = function (el) {
  el = this.$options.el || el
  if (el) {
    const node = document.querySelector(el)
    if (node) {
      new Watcher(() => {
        const renderNode = this._render()
        node.innerHTML = ''
        node.appendChild(renderNode)
      })
    }
  }
}

Vue.prototype._render = function () {
  if (this.$options.render) {
    return this.$options.render.call(this)
  } else {
    return null
  }
}

function initState(options, vm) {
  let { data, methods } = options
  initData(vm, data())
  initMethods(vm, methods)
}

function initData(vm, data) {
  observe(data)
  vm._data = data
  proxy(vm, '_data', data)
}

function initMethods(vm, methods) {
  for (const key in methods) {
    vm[key] = methods[key].bind(vm)
  }
}

function proxy(vm, path, data) {
  Object.keys(data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm[path][key]
      },
      set(val) {
        vm[path][key] = val
        return val
      }
    })
  })
}

function observe(data) {
  if (!(data && typeof data === 'object')) return
  for (const key in data) {
    observe(data[key])
    const dep = new Dep()
    const prototype = Object.getOwnPropertyDescriptor(data, key)
    const getter = prototype.get
    const setter = prototype.set
    let _val = data[key]
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        const val = getter ? getter.call(data) : _val
        dep.depend()
        return val
      },
      set(val) {
        const oldVal = getter ? getter.call(data) : _val
        if (val === oldVal) return
        if (setter) {
          setter.call(data, val)
        } else {
          _val = val
        }
        observe(val)
        dep.notify()
      }
    })
  }
}

class Dep {
  constructor() {
    this.deps = []
  }
  depend() {
    if (Dep.target) {
      this.deps.push(Dep.target)
    }
  }
  notify() {
    this.deps.forEach((watcher) => {
      watcher.update()
    })
  }
}

Dep.target = null
const depTargetStack = []

function pushTarget(target) {
  depTargetStack.push(target)
  Dep.target = target
}

function popTarget() {
  depTargetStack.pop()
  Dep.target = depTargetStack[depTargetStack.length - 1]
}

class Watcher {
  constructor(getter) {
    this.getter = getter
    this.getVal()
  }
  getVal() {
    pushTarget(this)
    this.getter()
    popTarget()
  }
  update() {
    this.getter()
  }
}
