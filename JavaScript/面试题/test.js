function findParent(root, id) {
  let ret
  const dfs = (nodes, path) => {
    if (ret) return
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        ret = [...path, id]
        return
      }
      if (nodes[i].children) {
        path.push(nodes[i].id)
        dfs(nodes[i].children, path)
        path.pop()
      }
    }
  }
  dfs(root, [])
  return ret
}

console.log(
  findParent(
    [
      {
        id: '1',
        name: 'test1',
        children: [
          {
            id: '11',
            name: 'test11',
            children: [
              {
                id: '111',
                name: 'test111'
              },
              {
                id: '112',
                name: 'test112'
              }
            ]
          },
          {
            id: '12',
            name: 'test12',
            children: [
              {
                id: '121',
                name: 'test121'
              },
              {
                id: '122',
                name: 'test122'
              }
            ]
          }
        ]
      }
    ],
    '112'
  )
)
