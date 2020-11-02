/**
 * 攻击队列类
 */
export default class AttackQueue {
  constructor(hero) {
    this.queue = []
    this.hero = hero
    this.isWait = true
  }
  get divideTime() {
    return 1000 / this.hero.heroProperties.speed
  }
  add(fn) {
    this.queue.push(fn)
    if (this.isWait) {
      this.startAttack()
    }
  }
  getFirstAction() {
    return this.queue.shift()
  }
  startAttack() {
    const action = this.getFirstAction()
    if (action) {
      this.isWait = false
      setTimeout(() => {
        if (this.hero.isDie) {
          this.queue = []
        } else {
          action()
          this.startAttack()
        }
      }, this.divideTime)
    } else {
      this.isWait = true
    }
  }
}
