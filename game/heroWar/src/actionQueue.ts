import BasePerson from './newHer'

type Action = () => boolean
type ActionCb = () => void
type QueueItem = [Action, ActionCb?]

export default class ActionQueue {
  private queue: Array<QueueItem>
  private hero: BasePerson
  public isWait: boolean
  constructor(hero: BasePerson) {
    this.queue = []
    this.hero = hero
    this.isWait = true
  }
  get divideTime(): number {
    return 1000 / this.hero.heroProperties.speed
  }
  add(action: Action, cb?: ActionCb): void {
    this.queue.push([action, cb])
    if (this.isWait) {
      this.startAction()
    }
  }
  getFirstAction(): QueueItem | undefined {
    return this.queue.shift()
  }
  startAction(): void {
    const action = this.getFirstAction()
    if (action) {
      this.isWait = false
      setTimeout(() => {
        if (this.hero.isDie) {
          this.queue = []
        } else {
          action[0]() && action[1] && action[1]()
          this.startAction()
        }
      }, this.divideTime)
    } else {
      this.isWait = true
    }
  }
}
