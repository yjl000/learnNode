export let canvasOption = {
  love: {
    length: 500, // 爱心最大数量
    duration: 2, // 爱心持续时间
    velocity: 100, // 速率
    effect: -0.75,
    size: 30 // 爱心大小
  }
}

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

export function Love () {
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

export function ParticlePool () {
  let particles
  let firstActive = 0
  let firstFree = 0
  let duration = canvasOption.love.duration
  let Loveq = new Love()
  class Pool {
    constructor (length) {
      particles = new Array(length)
      for (let i = 0; i < particles.length; i++) {
        particles[i] = new Loveq()
      }
    }

    add (x, y, dx, dy) {
      particles[firstFree].initialize(x, y, dx, dy)
      firstFree++
      if (firstFree === particles.length) {
        firstFree = 0
      }
      if (firstActive === firstFree) firstActive++
      if (firstActive === particles.length) firstActive = 0
    }

    update (deltaTime) {
      let i
      if (firstActive < firstFree) {
        for (i = firstActive; i < firstFree; i++) {
          particles[i].update(deltaTime)
        }
      }
      if (firstFree < firstActive) {
        for (i = firstActive; i < particles.length; i++) {
          particles[i].update(deltaTime)
        }
        for (i = 0; i < firstFree; i++) {
          particles[i].update(deltaTime)
        }
      }

      // 移除无效的爱心
      while (particles[firstActive].age >= duration && firstActive !== firstFree) {
        firstActive++
        if (firstActive === particles.length) firstActive = 0
      }
    }

    draw (context, image) {
      let i
      if (firstActive < firstFree) {
        for (i = firstActive; i < firstFree; i++) {
          particles[i].draw(context, image)
        }
      }
      if (firstFree < firstActive) {
        for (i = firstActive; i < particles.length; i++) {
          particles[i].draw(context, image)
        }
        for (i = 0; i < firstFree; i++) {
          particles[i].draw(context, image)
        }
      }
    }
  }
  return Pool
}
