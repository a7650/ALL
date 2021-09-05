function scheduler(tasks, n) {
  return new Promise((resolve, reject) => {
    let curIdx = n
    let rest = tasks.length
    const res = []

    const wrapTask = (i) => {
      const task = tasks[i]
      if (!task) return
      task()
        .then(
          (val) => {
            res[i] = val
          },
          (err) => {
            res[i] = err
          }
        )
        .finally(() => {
          rest--
          if (rest <= 0) {
            resolve(res)
          } else if (curIdx < tasks.length) {
            wrapTask(curIdx)
            curIdx++
          }
        })
    }
    for (let i = 0; i < n; i++) {
      wrapTask(i)
    }
  })
}

const a = (time, n) => () =>
  new Promise((r) => {
    setTimeout(() => {
      console.log(n)
      r()
    }, time)
  })

scheduler([a(1000, 1), a(500, 2), a(300, 3), a(800, 4)], 3).then(() => {
  console.log('end')
})
