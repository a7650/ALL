import { BaseParticle } from './particle'

interface BaseCanvasOpts {
  width: number
  height: number
  particles?: BaseParticle[]
  trackLevel?: number
}

export default class BaseCanvas {
  node: HTMLCanvasElement
  context: CanvasRenderingContext2D
  private pausing = false
  width!: number
  height!: number
  particles: BaseParticle[]
  trackLevel: number // range: [0, 10]
  constructor(opts: BaseCanvasOpts) {
    const node = (this.node = document.createElement('canvas'))
    this.context = node.getContext('2d') as CanvasRenderingContext2D
    this.particles = opts.particles || []
    this.resize(opts.width, opts.height)
    this.trackLevel = opts.trackLevel ?? 0
  }

  addParticle(particle: BaseParticle): void {
    this.particles.push(particle)
  }
  render(): void {
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
  protected tick(): void {
    if (this.pausing) return
    const context = this.context
    context.globalCompositeOperation = 'destination-out'
    context.fillStyle = 'rgba(0,0,0,' + (10 - this.trackLevel) / 10 + ')'
    context.fillRect(0, 0, this.width, this.height)
    context.globalCompositeOperation = 'lighter'
    this.render()
    requestAnimationFrame(this.tick.bind(this))
  }
  pause(): void {
    this.pausing = true
  }
  start(): void {
    if (this.pausing) {
      this.pausing = false
      requestAnimationFrame(this.tick.bind(this))
    }
  }

  mount(nodeId: string): void {
    const parent = nodeId ? document.getElementById(nodeId) : document.body
    if (parent) {
      parent.appendChild(this.node)
      this.tick()
    }
  }

  resize(width = 0, height = 0): void {
    this.node.width = this.width = width
    this.node.height = this.height = height
    this.clear()
  }

  clear(fill = '#000000'): void {
    this.context.fillStyle = fill
    this.context.fillRect(0, 0, this.width, this.height)
  }
}
