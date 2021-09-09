function _instanceof(a, b) {
  while (a && a.__proto__) {
    if (a.__proto__.constructor === b) return true
    a = a.__proto__
  }
  return false
}

class A {}
class D {}

class B extends A {}

class C extends B {}

console.log(_instanceof(new C(), D))
