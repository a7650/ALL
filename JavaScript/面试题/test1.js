const tree = [
  {
    id: 1,
    children: [
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      {
        id: 6,
        children: [{ id: 7 }, { id: 8 }, { id: 9 }, { id: 102 }]
      }
    ]
  },
  { id: 11, children: [{ id: 7 }, { id: 8 }, { id: 9 }, { id: 101 }] },
  {
    id: 12,
    children: [
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10, children: [{ id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }] }
    ]
  },
  { id: 13 },
  { id: 14 }
]

function getTarget(id, list) {
  let ret = null
  const dfs = (node, path) => {
    if (ret) return
    if (node.id === id) {
      ret = [...path, node]
    } else if (node.children) {
      const len = node.children.length
      for (let i = 0; i < len; i++) {
        path.push(node)
        dfs(node.children[i], path)
        path.pop()
      }
    }
  }
  const path = []
  list.forEach((item) => dfs(item, path))
  return ret
}

function getTarget(root, id) {
  let ret = null
  const dfs = (nodes, path) => {
    if (ret) return
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        ret = [...path, nodes[i]]
        return
      }
      if (nodes[i].children) {
        path.push(nodes[i])
        dfs(nodes[i].children, path)
        path.pop()
      }
    }
  }
  dfs(root, [])
  return ret
}

console.log(findParent(tree, 101))
