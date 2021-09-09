import traverse from '@babel/traverse'
import generate from '@babel/generator'
import * as types from 'babel-types'
import template from '@babel/template'

import parser from '@babel/parser'

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    class Test {
        say() {
            console.debug(3);
        }
        render() {
            console.error(4)
        }
    }
`

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous'
})
console.log(ast)

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

// const { code, map } = generate(ast)
// console.log(code)
// eval(code)
