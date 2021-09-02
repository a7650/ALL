// const Koa = require('koa')

// const app = new Koa()

// app.use((_, next) => {})

// app.use((_, next) => {
//   console.log(2)
//   next().then(() => {
//     console.log(2.2)
//   })
// })
const app = {
  // 存放中间件的数组
  middlewares: [],
  // 存储方法,模拟使用中间件
  use(fn) {
    this.middlewares.push(fn)
  }
}
app.compose = function (middlewares) {
  return async function () {
    await dispath(0)

    async function dispath(idx) {
      if (idx === app.middlewares.length) return

      const fn = app.middlewares[idx]
      await fn(function next() {
        dispath(idx + 1)
      })
    }
  }
}

app.use(async function (next) {
  console.log(1)
  await next()
  console.log(1.1)
})

app.use(async function (next) {
  console.log(2)
  await next()
  console.log(2.2)
})

app.compose()()

const pro = new Promise((resolve, reject) => {
  const innerpro = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 0)
    console.log(2)
    resolve(3)
  })
  innerpro.then((res) => console.log(res))
  resolve(4)
  console.log('pro')
})
pro.then((res) => console.log(res))
console.log('end')

// 2
// pro
// end
// 3
// 4

