import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as types from 'babel-types'
import template from '@babel/template'

const parser = require('@babel/parser')

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            console.error(4)
        }
    }
`
vistor

// const ast = parser.parse(sourceCode, {
//   sourceType: 'unambiguous',
//   plugins: ['jsx']
// })

// traverse(ast, {
//   CallExpression(path, state) {
//     if (
//       types.isMemberExpression(path.node.callee) &&
//       path.node.callee.object.name === 'console' &&
//       ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name)
//     ) {
//       if (path.node.isNew) return
//       const { line, column } = path.node.loc.start
//       const newNode = template.expression(
//         `console.log("filename: (${line}, ${column})")`
//       )()
//       newNode.isNew = true
//       path.insertBefore(newNode)
//       path.skip()
//     }
//   }
// })
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

// const { code, map } = generate(ast)
// console.log(code)
// eval(code)

// class FieldTest {
//   #name = 'zzp'
//   getName() {
//     console.log(this.#name)
//   }
// }

// const a = new FieldTest('zzp')
// console.log(a)
