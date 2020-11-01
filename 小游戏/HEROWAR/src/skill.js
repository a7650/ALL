/**技能 */
export default class Skill {
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
export class NormalAttack extends Skill {
    constructor() {
        super('__normalAttack__')
    }
    invoker(from, to) {
        to.attackReceived(from, from.heroProperties.attackValue)
    }
}

export class FireBall extends Skill {
    constructor() {
        super('FireBall', 10)
    }
    invoker(from, to) {
        to.attackReceived(from, 30)
        to.heroProperties.armorValue -= 5
        console.warn('火球术特效：削减敌方5点护甲')
    }
}

export class Frostbolt extends Skill {
    constructor() {
        super('Frostbolt', 30)
    }
    invoker(from, to) {
        to.attackReceived(from, 40)
    }
}

/**持续伤害技能 */
export class SustainedDamage extends Skill {
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

export class RecoverMp extends Skill {
    constructor() {
        super('RecoverMp', -50)
    }
    invoker(from, to) { }
}
