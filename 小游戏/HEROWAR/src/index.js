import { NormalAttack, FireBall, Frostbolt, SustainedDamage, RecoverMp } from "./skill";
import Hero from "./hero";
import './a.css'
// 创建英雄实例
const Lucy = new Hero({
  name: 'Lucy123111',
  attackValue: 20,
  armorValue: 0
})

const Jack = new Hero({
  name: 'Jack',
  attackValue: 10,
  armorValue: 10,
  speed: 3
})



// 学习技能
// Lucy.learnSkill(new FireBall())
Jack.learnSkill(new Frostbolt())
Lucy.learnSkill(new SustainedDamage())

//操作英雄
Lucy.normalAttack(Jack)
Lucy.useSkill('SustainedDamage', Jack)
Lucy.useSkill('FireBall', Jack)
Lucy.useSkill('FireBall', Jack)
Jack.useSkill('Frostbolt', Lucy)
Jack.normalAttack(Lucy)
Jack.normalAttack(Lucy)
Jack.useSkill('Frostbolt', Lucy)

if (module.hot) {
  module.hot.accept('./skill.js',() => {
    console.log(11111)
  })
}
