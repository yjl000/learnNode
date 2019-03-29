export let canvasOption = {
  love: {
    length: 5, // 爱心最大数量
    duration: 2, // 爱心持续时间
    velocity: 100, // 速率
    effect: -0.75,
    size: 30 // 爱心大小
  }
}
var settings = {
  particles: {
    length: 500, // maximum amount of particles
    duration: 2, // particle duration in sec
    velocity: 100, // particle velocity in pixels/sec
    effect: -0.75, // play with this for a nice effect
    size: 30, // particle size in pixels
  },
};

export class Point {
  constructor (x, y) {
    this.x = (typeof x !== 'undefined') ? x : 0
    this.y = (typeof y !== 'undefined') ? y : 0
  }

  clone () {
    return new Point(this.x, this.y)
  }

  length (length) {
    if (typeof length === 'undefined') {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    this.normalize()
    this.x *= length
    this.y *= length
    return this
  }

  normalize () {
    let length = this.length()
    this.x /= length
    this.y /= length
    return this
  }
}

export class Pool {
  constructor (length) {
    this.particles = new Array(length)
    this.firstActive = 0
    this.firstFree = 0
    this.duration = canvasOption.love.duration
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i] = new Love()
    }
  }

  add (x, y, dx, dy) {
    this.particles[this.firstFree].initialize(x, y, dx, dy)
    this.firstFree++
    if (this.firstFree === this.particles.length) {
      this.firstFree = 0
    }
    if (this.firstActive === this.firstFree) this.firstActive++
    if (this.firstActive === this.particles.length) this.firstActive = 0
  }

  update (deltaTime) {
    let i
    if (this.firstActive < this.firstFree) {
      for (i = this.firstActive; i < this.firstFree; i++) {
        this.particles[i].update(deltaTime)
      }
    }
    if (this.firstFree < this.firstActive) {
      for (i = this.firstActive; i < this.particles.length; i++) {
        this.particles[i].update(deltaTime)
      }
      for (i = 0; i < this.firstFree; i++) {
        this.particles[i].update(deltaTime)
      }
    }

    // 移除无效的爱心
    while (this.particles[this.firstActive].age >= this.duration && this.firstActive !== this.firstFree) {
      this.firstActive++
      if (this.firstActive === this.particles.length) this.firstActive = 0
    }
  }

  draw (context, image) {
    let i
    if (this.firstActive < this.firstFree) {
      for (i = this.firstActive; i < this.firstFree; i++) {
        this.particles[i].draw(context, image)
      }
    }
    if (this.firstFree < this.firstActive) {
      for (i = this.firstActive; i < this.particles.length; i++) {
        this.particles[i].draw(context, image)
      }
      for (i = 0; i < this.firstFree; i++) {
        this.particles[i].draw(context, image)
      }
    }
  }
}


export function Love() {
  class LoveT {
    constructor () {
      this.position = new Point()
      this.velocity = new Point()
      this.acceleration = new Point()
      this.age = 0
    }

    initialize (x, y, dx, dy) {
      this.position.x = x
      this.position.y = y
      this.velocity.x = dx
      this.velocity.y = dy
      this.acceleration.x = dx * canvasOption.love.effect
      this.acceleration.y = dy * canvasOption.love.effect
      this.age = 0
    }

    update (deltaTime) {
      this.position.x += this.velocity.x * deltaTime
      this.position.y += this.velocity.y * deltaTime
      this.velocity.x += this.acceleration.x * deltaTime
      this.velocity.y += this.acceleration.y * deltaTime
      this.age += deltaTime
    }
    draw (context, image) {
      function ease (t) {
        return (--t) * t * t + 1
      }

      let size = image.width * ease(this.age / canvasOption.love.duration)
      context.globalAlpha = 1 - this.age / canvasOption.love.duration
      context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size)
    }
  }
  return LoveT
}

