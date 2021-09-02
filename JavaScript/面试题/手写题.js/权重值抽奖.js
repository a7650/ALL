function lotto(config) {
  const totalVal = config.reduce((ret, cur) => ret + cur.value, 0)
  function run() {
    const target = Math.random() * totalVal
    let lst = 0
    for (let { value, invoker } of config) {
      if (target >= lst && target < lst + value) {
        invoker()
        return
      }
      lst += value
    }
  }
  return run
}

const run = lotto([
  { value: 1, invoker: () => console.log('抽中了1') },
  { value: 1, invoker: () => console.log('抽中了2') },
  { value: 100, invoker: () => console.log('抽中了3') }
])

   
