import BasePerson from './newHer'

export abstract class Skill {
  public name: string
  public mpSpend: number
  public readonly skillCb?: (from: BasePerson, to: BasePerson) => void
  constructor(name: string, mpSpend = 0) {
    this.name = name
    this.mpSpend = mpSpend
  }
  abstract invoker(from: BasePerson, to: BasePerson): void
}

const NORMAL_ATTACK_NAME = '__normalAttack__'
export class NormalAttack extends Skill {
  constructor() {
    super(NORMAL_ATTACK_NAME)
  }
  invoker(from: BasePerson, to: BasePerson): void {
    to.attackReceived(from, from.heroProperties.attackValue, this)
  }
  static NORMAL_ATTACK_NAME = NORMAL_ATTACK_NAME
}
