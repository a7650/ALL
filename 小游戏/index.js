
/**技能 */
class Skill {
  constructor(name, mpSpend = 0) {
    this.name = name
    this.mpSpend = mpSpend
  }
  /**使用技能 */
  invoker(from, to) {
    console.warn('技能invoker不存在')
  }
}

// 创建技能
class NormalAttack extends Skill {
  constructor() {
    super('__normalAttack__')
  }
  invoker(from, to) {
    to.attackReceived(from, from.heroProperties.attackValue)
  }
}

class FireBall extends Skill {
  constructor() {
    super('FireBall', 10)
  }
  invoker(from, to) {
    to.attackReceived(from, 30)
    to.heroProperties.armorValue -= 5
    console.warn('火球术特效：削减敌方5点护甲')
  }
}

class Frostbolt extends Skill {
  constructor() {
    super('Frostbolt', 30)
  }
  invoker(from, to) {
    to.attackReceived(from, 40)
  }
}

/**持续伤害技能 */
class SustainedDamage extends Skill {
  constructor() {
    super('SustainedDamage', 20)
  }
  invoker(from, to) {
    let count = 5
    const timer = setInterval(() => {
      if (to.isDie) {
        clearInterval(timer)
        return
      }
      to.attackReceived(from, 15)
      count--
      if (count <= 0) {
        clearInterval(timer)
      }
    }, 500)
  }
}

class RecoverMp extends Skill {
  constructor() {
    super('RecoverMp', -50)
  }
  invoker(from, to) { }
}

/**
 * 攻击队列类
 */
class AttackQueue {
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

// class

/** 英雄 */
class Hero {
  constructor(config) {
    const skills = {}
    const baseConfig = {
      name: 'hero',
      speed: 2,// 攻击次数
      hp: 100,
      mp: 100,
      totalHp: 100,
      totalMp: 100,
      attackValue: 10, // 攻击力
      armorValue: 0, // 护甲值
      skills
    }
    this.heroProperties = Object.assign({}, baseConfig, config)
    // 初始化攻击队列
    this.attackQueue = new AttackQueue(this)
    // 学习普通攻击技能
    this.learnSkill(new NormalAttack())
    // 初始化视图
    this.initView()
    // 渲染视图
    this.renderHeroView()
    this.HOOK = {
      BEFORE_ATTACK: 'BEFORE_ATTACK',
      ATTACKED: 'ATTACKED',
      BEFORE_DIE: 'BEFORE_DIE',
      DIED: 'DIED'
    }
  }
  get name() {
    return this.heroProperties.name
  }
  set name(value) {
    this.heroProperties.name = value
  }
  get isDie() {
    return this.heroProperties.hp <= 0
  }
  /**
   * 初始化视图
   */
  initView() {
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
    this.nameContainer = this.heroContainer.getElementsByClassName('hero-name')[0]
    this.hpContainer = this.heroContainer.getElementsByClassName('hp-inner')[0]
    this.mpContainer = this.heroContainer.getElementsByClassName('mp-inner')[0]
    this.propertiesContainer = this.heroContainer.getElementsByClassName('hero-properties')[0]
    this.skillContainer = this.heroContainer.getElementsByClassName('skill-properties')[0]
    document.body.appendChild(this.heroContainer)
    const heroProperties = this.heroProperties
    const self = this
    for (const propertyName of Object.keys(heroProperties)) {
      let value = heroProperties[propertyName]
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
  /**
   * 刷新hero视图
   */
  renderHeroView() {
    this.nameContainer.innerHTML = this.name
    this.hpContainer.style.width = `${this.heroProperties.hp * 100 / this.heroProperties.totalHp}%`
    this.mpContainer.style.width = `${this.heroProperties.mp * 100 / this.heroProperties.totalMp}%`
    this.propertiesContainer.innerHTML = `HP:${this.heroProperties.hp}，MP:${this.heroProperties.mp}，攻击力:${this.heroProperties.attackValue}，护甲值:${this.heroProperties.armorValue}`
    this.skillContainer.innerHTML = '技能:' + Object.keys(this.heroProperties.skills).join('，')
  }

  /**
   * 普通攻击
   */
  normalAttack(targetHero) {
    console.warn(`${this.name}攻击了${targetHero.name}`)
    this.useSkill('__normalAttack__', targetHero)
    // return this.heroProperties.skills.__normalAttack__.invoker(this, targetHero)
  }
  /**
   * 使用技能
   * @param {String} name 技能名称
   */
  useSkill(name, targetHero) {
    const skill = this.heroProperties.skills[name]
    if (skill) {
      this.attackQueue.add(() => {
        const skillInvoker = skill.invoker
        if (this.heroProperties.mp < skill.mpSpend) {
          console.warn(`<${this.name}>人物mp不足，<${skill.name}>技能无法释放`)
          return
        }
        console.warn(`${this.name}对${targetHero.name}使用了<${name}>技能`)
        this.heroProperties.mp = Math.max(0, this.heroProperties.mp - skill.mpSpend)
        skillInvoker(this, targetHero)
      })
    }
  }
  /**
   * 受到攻击
   * @param {Hero} fromHero 来源英雄
   * @param {Number} value 伤害值
   */
  attackReceived(fromHero, value) {
    if (this.heroProperties.hp <= 0) return
    // 减去护甲值
    const realDamage = value - this.heroProperties.armorValue
    this.heroProperties.hp = Math.max(0, this.heroProperties.hp - realDamage)
    console.log(`${this.name}说：我受到了${fromHero.name}的${value}点攻击，由于我的护甲值是${this.heroProperties.armorValue}，所以我受到的真实伤害是${realDamage}`)
    if (this.heroProperties.hp <= 0) {
      this.dieHook(fromHero)
    }
  }
  /**
   * 学习技能
   * @param {Skill} skill 技能
   */
  learnSkill(skill) {
    this.heroProperties.skills = Object.assign({}, this.heroProperties.skills, { [skill.name]: skill })
  }
  /**
   * 角色死亡
   */
  dieHook(fromHero) {
    console.log(`%c 系统提示：<${this.name}>被<${fromHero.name}>击杀`, 'background-color:#f00;color:#fff')
  }
  BEFORE_ATTACK() { }
}



// 创建英雄实例
const Lucy = new Hero({
  name: 'Lucy',
  attackValue: 20,
  armorValue: 0
})

const Jack = new Hero({
  name: 'Jack',
  attackValue: 10,
  armorValue: 10,
  speed: 1
})



// 学习技能
Lucy.learnSkill(new FireBall())
Jack.learnSkill(new Frostbolt())
Lucy.learnSkill(new SustainedDamage())

//操作英雄
Lucy.normalAttack(Jack)
Lucy.useSkill('SustainedDamage', Jack)
Lucy.useSkill('FireBall', Jack)
Lucy.useSkill('FireBall', Jack)
Jack.normalAttack(Lucy)
Jack.normalAttack(Lucy)
Jack.useSkill('Frostbolt', Lucy)
Jack.useSkill('Frostbolt', Lucy)