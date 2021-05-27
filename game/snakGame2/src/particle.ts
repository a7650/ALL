export interface BaseParticleOpts {
  hue: number
}

export abstract class BaseParticle {
  // constructor(opts: BaseParticleOpts) {}
  abstract update: () => void
  abstract render: (context: CanvasRenderingContext2D) => void
  abstract boundaryCondition: () => boolean
}

// export 
