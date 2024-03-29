function ObserverList() {
  this.observerList = []
}

ObserverList.prototype.add = function (obj) {
  return this.observerList.push(obj)
}

ObserverList.prototype.count = function () {
  return this.observerList.length
}

ObserverList.prototype.get = function (index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index]
  }
}
ObserverList.prototype.indexOf = function (obj, startIndex) {
  var i = startIndex || 0
  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      return i
    }
    i++
  }
  return -1
}

ObserverList.prototype.removeAt = function (index) {
  this.observerList.splice(index, 1)
}

// 目标
function Subject() {
  this.observers = new ObserverList()
}

Subject.prototype.addObsever = function (observer) {
  this.observers.add(observer)
}

Subject.prototype.removeObsever = function (observer) {
  this.observers.removeAt(this.observers.indexOf(observer, 0))
}

Subject.prototype.notify = function (context) {
  var observerCount = this.observers.count()
  for (var i = 0; i < observerCount; i++) {
    this.observers.get(i).update(context)
  }
}

// 观察者
function Observer() {
  this.update = function (context) {
    console.log(context)
  }
}

var mySubject = new Subject()
mySubject.addObsever(new Observer())
mySubject.notify('hello world')
