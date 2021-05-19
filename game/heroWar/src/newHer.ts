import ActionQueue from './actionQueue'
import { NormalAttack, Skill } from './skill'

export interface IPersonProperties {
  name: string
  speed: number
  hp: number
  mp: number
  totalHp: number
  totalMp: number
  attackValue: number
  armorValue: number
  skills: {
    [propName: string]: Skill
  }
}

interface IAttackReceiveRecord {
  from: BasePerson
  skill: Skill
  realDamage: number
}

const _emptyNode = document.createElement('div')
export default class BasePerson {
  public readonly name: string
  public heroProperties: IPersonProperties
  public actionQueue: ActionQueue
  public attackReceiveRecords: Array<IAttackReceiveRecord> = []
  public isFightingStatus = false
  private fightingTimer: number | null = null
  public heroContainer: HTMLDivElement = _emptyNode
  public nameContainer: HTMLDivElement = _emptyNode
  public hpContainer: HTMLDivElement = _emptyNode
  public mpContainer: HTMLDivElement = _emptyNode
  public propertiesContainer: HTMLDivElement = _emptyNode
  public skillContainer: HTMLDivElement = _emptyNode
  constructor(personOptions: Partial<IPersonProperties>) {
    const defaultProperties: IPersonProperties = {
      name: '__name__',
      speed: 2,
      hp: 100,
      mp: 100,
      totalHp: 100,
      totalMp: 100,
      attackValue: 10,
      armorValue: 0,
      skills: {}
    }
    this.heroProperties = Object.assign({}, defaultProperties, personOptions)
    this.name = this.heroProperties.name
    this.actionQueue = new ActionQueue(this)
    this.learnSkill(new NormalAttack())
    this.initView()
    this.renderHeroView()
  }
  get isDie(): boolean {
    return this.heroProperties.hp <= 0
  }
  /**
   * 初始化视图
   */
  initView(): void {
    const heroContainerTemplate = `
      <div class="hero" id=${this.name}>
        <div class="hero-name"></div>
        <div class="hero-hp-bar"><div class="hp-inner"></div></div>
        <div class="hero-mp-bar"><div class="mp-inner"></div></div>
        <div class="hero-properties"></div>
        <div class="skill-properties"></div>
      </div>
    `
    this.heroContainer = document.createElement('div')
    this.heroContainer.innerHTML = heroContainerTemplate
    this.nameContainer = <HTMLDivElement>(
      this.heroContainer.getElementsByClassName('hero-name')[0]
    )
    this.hpContainer = <HTMLDivElement>(
      this.heroContainer.getElementsByClassName('hp-inner')[0]
    )
    this.mpContainer = <HTMLDivElement>(
      this.heroContainer.getElementsByClassName('mp-inner')[0]
    )
    this.propertiesContainer = <HTMLDivElement>(
      this.heroContainer.getElementsByClassName('hero-properties')[0]
    )
    this.skillContainer = <HTMLDivElement>(
      this.heroContainer.getElementsByClassName('skill-properties')[0]
    )
    document.body.appendChild(this.heroContainer)
    const heroProperties = this.heroProperties
    const self = this
    for (const propertyName of Object.keys(heroProperties)) {
      let value = heroProperties[<keyof IPersonProperties>propertyName]
      Object.defineProperty(heroProperties, propertyName, {
        enumerable: true,
        configurable: true,
        get() {
          return value
        },
        set(val) {
          if (val !== value) {
            value = val
            self.renderHeroView()
          }
        }
      })
    }
  }
  renderHeroView():void {
    this.nameContainer.innerHTML = this.name
    this.hpContainer.style.width = `${
      (this.heroProperties.hp * 100) / this.heroProperties.totalHp
    }%`
    this.mpContainer.style.width = `${
      (this.heroProperties.mp * 100) / this.heroProperties.totalMp
    }%`
    this.propertiesContainer.innerHTML = `HP:${this.heroProperties.hp}，MP:${this.heroProperties.mp}，攻击力:${this.heroProperties.attackValue}，护甲值:${this.heroProperties.armorValue}`
    this.skillContainer.innerHTML =
      '技能:' + Object.keys(this.heroProperties.skills).join('，')
  }
  private processAttackRecords(record?: IAttackReceiveRecord): void {
    if (record) {
      this.attackReceiveRecords.push(record)
    }
    this.fightingTimer && clearTimeout(this.fightingTimer)
    this.fightingTimer = window.setTimeout(() => {
      this.attackReceiveRecords = []
      this.isFightingStatus = false
    }, 5000)
    this.isFightingStatus = true
  }
  normalAttack(target: BasePerson): void {
    this.useSkill(NormalAttack.NORMAL_ATTACK_NAME, target)
  }
  attackReceived(from: BasePerson, value: number, skill: Skill): void {
    if (this.isDie || value < 0) return
    const realDamage = Math.max(1, value - this.heroProperties.armorValue)
    this.heroProperties.hp = Math.max(0, this.heroProperties.hp - realDamage)
    this.processAttackRecords({ from, skill, realDamage })
    if (this.heroProperties.hp <= 0) {
      this.dieHook(from)
    }
  }
  recoverHealth(value: number): void {
    if (value < 0) return
    this.heroProperties.hp = Math.min(
      this.heroProperties.totalHp,
      this.heroProperties.hp + value
    )
  }
  useSkill(skillName: string, target: BasePerson): void {
    const skill = this.heroProperties.skills[skillName]
    if (skill) {
      const skillInvoker = skill.invoker
      const skillCb = skill.skillCb
      this.actionQueue.add(
        () => {
          if (this.heroProperties.mp < skill.mpSpend) {
            return false
          }
          this.heroProperties.mp = this.heroProperties.mp - skill.mpSpend
          skillInvoker.call(skill, this, target)
          return true
        },
        () => {
          this.processAttackRecords()
          skillCb && skillCb(this, target)
        }
      )
    }
  }
  learnSkill(skill: Skill): void {
    this.heroProperties.skills[skill.name] = skill
  }
  dieHook(from: BasePerson): void {
    console.log('died , by ' + from.name)
    console.log('attackReceiveRecords', this.attackReceiveRecords)
  }
}
