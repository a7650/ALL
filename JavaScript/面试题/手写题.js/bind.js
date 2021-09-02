var $Array = Array
var ArrayPrototype = $Array.prototype
var $Object = Object
var array_push = ArrayPrototype.push
var array_slice = ArrayPrototype.slice
var array_join = ArrayPrototype.join
var array_concat = ArrayPrototype.concat
var $Function = Function
var FunctionPrototype = $Function.prototype
var apply = FunctionPrototype.apply
var max = Math.max
// 简版 源码更复杂些。
var isCallable = function isCallable(value) {
  if (typeof value !== 'function') {
    return false
  }
  return true
}
var Empty = function Empty() { }

FunctionPrototype.bindFn = function bind(that) {
  var target = this
  if (!isCallable(target)) {
    throw new TypeError(
      'Function.prototype.bind called on incompatible ' + target
    )
  }
  var args = array_slice.call(arguments, 1)
  var bound
  var binder = function () {
    if (this instanceof bound) {
      var result = apply.call(
        target,
        this,
        array_concat.call(args, array_slice.call(arguments))
      )
      if ($Object(result) === result) {
        return result
      }
      return this
    } else {
      return apply.call(
        target,
        that,
        array_concat.call(args, array_slice.call(arguments))
      )
    }
  }
  var boundLength = max(0, target.length - args.length)
  var boundArgs = []
  for (var i = 0; i < boundLength; i++) {
    array_push.call(boundArgs, '$' + i)
  }
  // 这里是Function构造方式生成形参length $1, $2, $3...
  bound = $Function(
    'binder',
    'return function (' +
      array_join.call(boundArgs, ',') +
      '){ return binder.apply(this, arguments); }'
  )(binder)

  if (target.prototype) {
    Empty.prototype = target.prototype
    bound.prototype = new Empty()
    Empty.prototype = null
  }
  return bound
}
