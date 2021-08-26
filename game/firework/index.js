(function (globalThis) {
  /**
   * 画布
   */
  class BaseCanvas {
    /**
     * @param {{width:number,height:number,particles: BaseParticle[]}} opts
     */
    constructor(opts) {
      opts = opts || {}
      const node = (this.node = document.createElement('canvas'))
      this.context = node.getContext('2d')
      this.particles = opts.particles || []
      this.pausing = false
      this.resize(opts.width, opts.height)
    }

    /**
     * @param {BaseParticle} particle
     */
    addParticle(particle) {
      this.particles.push(particle)
    }
    render() {
      const context = this.context
      const particles = this.particles
      let i = 0
      while (i < particles.length) {
        const ptl = particles[i]
        ptl.update()
        if (ptl.boundaryCondition()) {
          particles.splice(i, 1)
          continue
        }
        ptl.render(context)
        i++
      }
    }
    tick() {
      if (this.pausing) return
      const context = this.context
      context.globalCompositeOperation = 'destination-out'
      context.fillStyle = 'rgba(0,0,0,' + 0.2 + ')'
      context.fillRect(0, 0, this.width, this.height)
      context.globalCompositeOperation = 'lighter'
      this.render()
      requestAnimationFrame(this.tick.bind(this))
    }
    pause() {
      this.pausing = true
    }
    start() {
      if (this.pausing) {
        this.pausing = false
        requestAnimationFrame(this.tick.bind(this))
      }
    }
    /**
     * @param {{id:string}} nodeId
     */
    append(nodeId) {
      const parent = nodeId ? document.getElementById(nodeId) : document.body
      if (parent) {
        parent.appendChild(this.node)
      }
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    resize(width = 0, height = 0) {
      this.node.width = this.width = width
      this.node.height = this.height = height
      this.clear()
    }

    /**
     * @param {string}} fill
     */
    clear(fill = '#000000') {
      this.context.fillStyle = fill
      this.context.fillRect(0, 0, this.width, this.height)
    }
  }

  /**
   * 基础粒子
   */
  class BaseParticle {
    /**
     * @param {{hue:number,hueVariance:number}} opts
     */
    constructor(opts) {
      opts = opts || {}
      this.hue = opts.hue || Math.random() * 360
      this.hueVariance = opts.hueVariance || 30
    }
    update() {}
    /**
     * @param {CanvasRenderingContext2D} context
     */
    render(context) {}
    boundaryCondition() {
      return true
    }
    setupColors(p) {
      p.hue =
        Math.floor(
          Math.random() *
            (this.hue + this.hueVariance - (this.hue - this.hueVariance))
        ) +
        (this.hue - this.hueVariance)
      p.brightness = Math.floor(Math.random() * 21) + 50
      p.alpha = (Math.floor(Math.random() * 61) + 40) / 100
    }
    getFillStyle(p) {
      return 'hsla(' + p.hue + ',100%,' + p.brightness + '%,' + p.alpha + ')'
    }
  }

  /**
   * Fireworks父类
   */
  class Fireworks extends BaseParticle {
    constructor(opts) {
      super(opts)
      this.particles = []
    }

    update() {
      const particles = this.particles
      let i = 0
      while (i < particles.length) {
        const p = particles[i]
        // p.x += (p.fx - p.x) / 10
        // p.y += (p.fy - p.y) / 10 - (p.alpha - 1) * p.speed
        p.x += ((p.fx - p.x) * p.speed) / 100
        p.y += ((p.fy - p.y) * p.speed) / 100 - ((p.alpha - 1) * p.speed) / 5

        p.alpha -= 0.005
        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }
        i++
      }
    }
    /**
     * @param {CanvasRenderingContext2D} context
     */
    render(context) {
      this.particles.forEach((p) => {
        context.beginPath()
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false)
        context.closePath()
        context.fillStyle = this.getFillStyle(p)
        context.fill()
      })
    }
    boundaryCondition() {
      return this.particles.length === 0
    }
  }

  /**
   * Text
   */

  class TextFirework extends Fireworks {
    constructor(opts) {
      opts = opts || {}
      const {
        x,
        y,
        text,
        sizeBase = 3,
        speedBase = 7,
        radiusBase = 140
      } = opts
      super(opts)
      if (text) {
        const gap = 6
        const fontSize = radiusBase
        const textCanvas = TextFirework.textCanvas
        const textctx = TextFirework.textctx

        textctx.font = fontSize + 'px Verdana'
        textctx.fillStyle = '#ffffff'

        const textWidth = parseInt(textctx.measureText(text).width)
        const textHeight = fontSize
        textctx.fillText(text, 0, textHeight)
        const imgData = textctx.getImageData(0, 0, textWidth, textHeight * 1.2)
        textctx.fillStyle = '#000000'
        textctx.fillRect(0, 0, textCanvas.width, textCanvas.height)
        const imgDataArr = Array.from(imgData.data)
        for (let h = 0; h < textHeight * 1.2; h += gap) {
          for (let w = 0; w < textWidth; w += gap) {
            let position = (textWidth * h + w) * 4
            let r = imgDataArr[position],
              g = imgDataArr[position + 1],
              b = imgDataArr[position + 2],
              a = imgDataArr[position + 3]
            if (r + g + b === 0) {
              continue
            }

            const p = {}

            p.x = x
            p.y = y

            p.fx = x + w - textWidth / 2
            p.fy = y + h - textHeight / 2

            p.size = Math.random() * sizeBase + 1
            p.speed = Math.random() * speedBase + 1

            this.setupColors(p)
            this.particles.push(p)
          }
        }
      }
    }
    static textCanvas = new BaseCanvas({ width: 1000, height: 300 })
    static textctx = TextFirework.textCanvas.context
  }

  TextFirework.textctx.fillStyle = '#000000'
  TextFirework.textctx.fillRect(
    0,
    0,
    TextFirework.textCanvas.width,
    TextFirework.textCanvas.height
  )

  /**
   * Circle
   */
  class CircleFirework extends Fireworks {
    constructor(opts) {
      opts = opts || {}
      const {
        x,
        y,
        count = 100,
        sizeBase = 2,
        speedBase = 4,
        radiusBase = 100
      } = opts
      super(opts)
      this.particles = []
      for (let i = 0; i < count; i++) {
        let angle = (360 / count) * i // 角度
        let radians = (angle * Math.PI) / 180 // 弧度

        let p = {}

        p.x = x
        p.y = y
        p.radians = radians

        p.size = Math.random() * sizeBase + 1 // 大小
        p.speed = Math.random() * speedBase + 0.4 // 速度
        p.radius = Math.random() * radiusBase + 50 // 半径

        p.fx = x + Math.cos(radians) * p.radius
        p.fy = y + Math.sin(radians) * p.radius

        this.setupColors(p)
        this.particles.push(p)
      }
    }
  }

  /**
   * Heart
   */
  class HeartFirework extends Fireworks {
    constructor(opts) {
      opts = opts || {}
      const { x, y, sizeBase = 2, speedBase = 4, radiusBase = 100 } = opts
      super(opts)
      this.particles = []
      const deltaI = Math.PI / 180
      const maxI = 2 * Math.PI
      for (let i = 0; i < maxI; i = i + deltaI) {
        const p = {}

        p.x = x
        p.y = y
        p.fx = (this.getX(i) * radiusBase) / 10 + x
        p.fy = (-this.getY(i) * radiusBase) / 10 + y
        p.size = Math.random() * sizeBase + 1
        p.speed = Math.random() * speedBase + 0.4

        this.setupColors(p)
        this.particles.push(p)
      }
    }
    getX(t) {
      return 16 * Math.pow(Math.sin(t), 3)
    }

    getY(t) {
      return (
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      )
    }
  }

  /**
   * Emitter
   */
  class Emitter extends BaseParticle {
    constructor(opts) {
      opts = opts || {}
      const { x, y, boomFn } = opts
      super(opts)
      this.setupColors(this)
      const emitter = {}

      const deltaX = x - Emitter.startX
      const deltaY = y - Emitter.startY
      const sideLen = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      emitter.sin = Math.abs(deltaY / sideLen)
      emitter.cos = Math.abs(deltaX / sideLen)
      emitter.tan = deltaY / deltaX
      emitter.speed = 5
      emitter.x = Emitter.startX
      emitter.y = Emitter.startY
      emitter.dx = (deltaX > 0 ? 1 : -1) * emitter.cos * emitter.speed
      emitter.dy = (deltaY > 0 ? 1 : -1) * emitter.sin * emitter.speed
      emitter.abs_dx = Math.abs(emitter.dx)
      emitter.targetX = x
      emitter.targetY = y
      emitter.alpha = 1
      emitter.boomFn = boomFn

      this.config = emitter
    }
    update() {
      this.config.x += this.config.dx
      this.config.y += this.config.dy
    }
    boundaryCondition() {
      if (this.config.y <= this.config.targetY) {
        this.config.boomFn()
        return true
      }
      return false
    }
    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    render(context) {
      context.beginPath()
      context.arc(this.config.x, this.config.y, 3, 0, Math.PI * 2, false)
      context.closePath()

      context.fillStyle = this.getFillStyle(this)
      context.fill()
    }
    static startX = 0
    static startY = 0
  }

  class RoundItem extends BaseParticle {
    constructor(opts) {
      opts = opts || {}
      const { index, x, y, maxY = window.innerHeight } = opts
      super(opts)
      this.index = index
      this.x = x
      this.y = y
      this.maxY = maxY
      this.r = Math.random()
      this.setupColors(this)
      this.color = this.getFillStyle(this)
    }
    getFillStyle() {
      return `rgba(255,255,255,${this.alpha})`
    }
    update() {
      this.y -= 0.15
      this.alpha -= 0.005
      if (this.y <= -10) {
        this.y = this.maxY + 10
      }
      if (this.alpha <= 0) {
        this.alpha = 1
      }
    }
    render(context) {
      context.fillStyle = this.getFillStyle(this)
      context.shadowBlur = this.r * 2
      context.beginPath()
      context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
      context.closePath()
      context.fill()
    }
    boundaryCondition() {
      return false
    }
  }

  class MouseTrack extends BaseParticle {
    constructor(opts) {
      super(opts)
      this.x = opts.x
      this.y = opts.y
      this.renderCount = 0
      this.setupColors(this)
      this.alpha = 0.1
    }
    render(context) {
      context.beginPath()
      context.arc(this.x, this.y, 2, 0, Math.PI * 2, false)
      context.closePath()
      context.fillStyle = this.getFillStyle(this)
      context.fill()
      this.renderCount += 1
    }
    boundaryCondition() {
      return this.renderCount > 5
    }
  }

  class LaunchQueue {
    constructor(queue) {
      this.queue = queue
      this.cur = -1
    }
    get nextFirework() {
      this.cur = (this.cur + 1) % this.queue.length
      return this.queue[this.cur]
    }
    randomFirework() {
      return this.queue(Math.floor(Math.random() * this.queue.length))
    }
  }

  const canvas = new BaseCanvas()
  canvas.append()
  canvas.tick()
  document.addEventListener('keypress', (e) => {
    if (e.code === 'KeyQ') {
      canvas.pause()
    }
  })
  document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyQ') {
      canvas.start()
    }
  })

  const resizeHandler = () => {
    canvas.resize(window.innerWidth, window.innerHeight)
    Emitter.startX = canvas.width / 2
    Emitter.startY = canvas.height
  }

  const initRound = (count = 100) => {
    for (let i = 0; i < count; i++) {
      canvas.addParticle(
        new RoundItem({
          index: i,
          x: canvas.width * Math.random(),
          y: canvas.height * Math.random()
        })
      )
    }
  }

  const launchFirework = (x, y, fireworkInstance) => {
    const emitter = new Emitter({
      x,
      y,
      hue: fireworkInstance.hue,
      hueVariance: fireworkInstance.hueVariance,
      boomFn: () => canvas.addParticle(fireworkInstance)
    })
    canvas.addParticle(emitter)
  }

  const circleFireworkInvoker = (x, y, opts = {}) => {
    launchFirework(x, y, new CircleFirework({ x, y, ...opts }))
  }

  const textFireworkInvoker = (x, y, text, opts) => {
    if (!text) return
    opts = opts || {}
    if (typeof text === 'string') {
      opts.text = text
    } else {
      opts = text
    }
    launchFirework(x, y, new TextFirework({ x, y, ...opts }))
  }

  const heartFireworkInvoker = (x, y, opts = {}) => {
    launchFirework(x, y, new HeartFirework({ x, y, ...opts }))
  }

  const randomFirework = (function () {
    const queue = new LaunchQueue([
      (x, y) => {
        heartFireworkInvoker(x, y, { speedBase: 1 })
      },
      (x, y) => {
        textFireworkInvoker(x, y, '')
      },
      (x, y) => {
        textFireworkInvoker(x, y, '')
      },
      (x, y) => {
        textFireworkInvoker(x, y, '')
      },
      (x, y) => {
        circleFireworkInvoker(x, y)
      }
    ])
    return () => {
      const x = window.innerWidth * Math.random()
      const y = window.innerHeight * Math.random()
      queue.nextFirework(x, y)
    }
  })()

  const addMouseTrack = () => {
    let colorParticle = new BaseParticle()
    setInterval(() => {
      colorParticle = new BaseParticle()
    }, 1000)
    const handler = (e) => {
      canvas.addParticle(
        new MouseTrack({
          x: e.clientX,
          y: e.clientY,
          hue: colorParticle.hue,
          hueVariance: colorParticle.hueVariance
        })
      )
    }
    document.addEventListener('mousemove', handler)
    return () => document.removeEventListener('mousemove', handler)
  }

  const touchHandler = (function () {
    const queue = new LaunchQueue([
      (x, y) => {
        heartFireworkInvoker(x, y, { speedBase: 1 })
      },
      (x, y) => {
        textFireworkInvoker(x, y, '')
      },
      (x, y) => {
        textFireworkInvoker(x, y, '')
      },
      (x, y) => {
        textFireworkInvoker(x, y, '')
      },
      (x, y) => {
        circleFireworkInvoker(x, y)
      }
    ])
    return (e) => {
      const { clientX: x, clientY: y } = e
      queue.nextFirework(x, y)
    }
  })()

  /**
   * init
   */
  resizeHandler()
  initRound()
  setInterval(randomFirework, 2000)
  addMouseTrack()
  window.addEventListener('resize', resizeHandler)
  document.addEventListener('mousedown', touchHandler)
  document.addEventListener('touchstart', touchHandler)
})(window)
