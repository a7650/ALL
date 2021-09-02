Function.prototype._call = function (context, ...args) {
  context = context || window
  context.__fn__ = this
  const ret = context.__fn__(...args)
  delete context.__fn__
  return ret
}

Function.prototype._apply = function (context, args) {
  return this._call(context, ...args)
}

Function.prototype._bind = function (context, ...args) {
  const self = this
  return function (...args2) {
    return self._apply(context, [...args, ...args2])
  }
}

// 浏览器环境 非严格模式
function getGlobalObject() {
  return this
}
function generateFunctionCode(argsArrayLength) {
  var code = 'return arguments[0][arguments[1]]('
  for (var i = 0; i < argsArrayLength; i++) {
    if (i > 0) {
      code += ','
    }
    code += 'arguments[2][' + i + ']'
  }
  code += ')'
  // return arguments[0][arguments[1]](arg1, arg2, arg3...)
  return code
}
Function.prototype.applyFn = function apply(thisArg, argsArray) {
  // `apply` 方法的 `length` 属性是 `2`。
  // 1.如果 `IsCallable(func)` 是 `false`, 则抛出一个 `TypeError` 异常。
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function')
  }
  // 2.如果 argArray 是 null 或 undefined, 则
  // 返回提供 thisArg 作为 this 值并以空参数列表调用 func 的 [[Call]] 内部方法的结果。
  if (typeof argsArray === 'undefined' || argsArray === null) {
    argsArray = []
  }
  // 3.如果 Type(argArray) 不是 Object, 则抛出一个 TypeError 异常 .
  if (argsArray !== new Object(argsArray)) {
    throw new TypeError('CreateListFromArrayLike called on non-object')
  }
  if (typeof thisArg === 'undefined' || thisArg === null) {
    // 在外面传入的 thisArg 值会修改并成为 this 值。
    // ES3: thisArg 是 undefined 或 null 时它会被替换成全局对象 浏览器里是window
    thisArg = getGlobalObject()
  }
  // ES3: 所有其他值会被应用 ToObject 并将结果作为 this 值，这是第三版引入的更改。
  thisArg = new Object(thisArg)
  var __fn = '__' + new Date().getTime()
  // 万一还是有 先存储一份，删除后，再恢复该值
  var originalVal = thisArg[__fn]
  // 是否有原始值
  var hasOriginalVal = thisArg.hasOwnProperty(__fn)
  thisArg[__fn] = this
  // 9.提供 `thisArg` 作为 `this` 值并以 `argList` 作为参数列表，调用 `func` 的 `[[Call]]` 内部方法，返回结果。
  // ES6版
  // var result = thisArg[__fn](...args);
  var code = generateFunctionCode(argsArray.length)
  var result = new Function(code)(thisArg, __fn, argsArray)
  delete thisArg[__fn]
  if (hasOriginalVal) {
    thisArg[__fn] = originalVal
  }
  return result
}

Function.prototype.bind =
  Function.prototype.bind ||
  function bind(thisArg) {
    if (typeof this !== 'function') {
      throw new TypeError(this + ' must be a function')
    }
    var self = this
    var args = [].slice.call(arguments, 1)
    var bound = function () {
      var boundArgs = [].slice.call(arguments)
      var finalArgs = args.concat(boundArgs)
      if (this instanceof bound) {
        // return new self(finalArgs)
        if (self.prototype) {
          bound.prototype = Object.create(self.prototype)
        }
        var result = self.apply(this, finalArgs)
        var isObject = typeof result === 'object' && result !== null
        var isFunction = typeof result === 'function'
        if (isObject || isFunction) {
          return result
        }
        return this
      } else {
        return self.apply(thisArg, finalArgs)
      }
    }
    return bound
  }

const _array_prototype = Array.prototype
const _function_prototype = Function.prototype
const _slice = _array_prototype.slice
const _concat = _array_prototype.concat
const _apply = _function_prototype.apply

Function.prototype._bind = function (targetThis) {
  if (typeof this !== 'function') {
    throw new TypeError(this)
  }
  const target = this
  const oriArgs = _slice.call(arguments, 1)
  const bind = function () {
    const finalArgs = _concat.call(oriArgs, _slice.call(arguments))
    if (this instanceof bind) {
      const ret = _apply.call(target, finalArgs)
      if (Object(ret) === ret) return ret
      return this
    } else {
      return _apply.call(target, targetThis, finalArgs)
    }
  }
  if (target.prototype) {
    bind.prototype = Object.create(target.prototype)
  }
  return bind
}
