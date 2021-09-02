;(function () {
  document.addEventListener('DOMContentLoaded', () => {
    document.__DOMContentLoaded = true
  })

  const $ = function (val) {
    return new $.init(val)
  }

  window.$ = $

  $.init = function (val) {
    const typeVal = typeof val
    if (typeVal === 'function') {
      if (document.__DOMContentLoaded) {
        val()
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          val()
        })
      }
    } else if (typeVal === 'string') {
      const nodes = document.querySelectorAll(val)
      this.nodesLength = nodes.length
      for (let i = 0; i < nodes.length; i++) {
        this[i] = nodes[i]
      }
    }
  }

  $.init.prototype = {
    nth(n) {
      this._selectedNode = this[n - 1]
      if (!this._selectedNode) return null
      return this
    },
    all() {
      this._selectedNode = null
    },
    /**
     *
     * @param {(node:HTMLElement) => void} fn
     */
    execute(fn) {
      let nodes = this
      let len = this.nodesLength
      if (this._selectedNode) {
        nodes = [this._selectedNode]
        len = 1
      }
      for (let i = 0; i < len; i++) {
        fn(nodes[i])
      }
    },
    click(fn) {
      this.execute((node) => {
        node.addEventListener('click', (e) => {
          fn.call(node, e)
        })
      })
    },
    addClass(list) {
      if (typeof list === 'string') {
        list = [list]
      }
      this.execute((node) => {
        node.classList.add(...list)
      })
    },
    removeClass(list) {
      if (typeof list === 'string') {
        list = [list]
      }
      this.execute((node) => {
        node.classList.remove(...list)
      })
    }
  }
})()
