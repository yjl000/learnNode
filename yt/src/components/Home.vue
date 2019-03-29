<template>
  <div class="home">
    <swiper :options="swiperOption" class="swiper-box">
      <swiper-slide class="swiper-item">
        <div class="slide1">
          <div class="slide1_img1 animated fadeInLeft">
            <img src="../assets/home/slide1_1.jpg" alt="">
          </div>
          <div class="slide1_img2 animated fadeInRight">
            <img src="../assets/home/slide1_2.jpg" alt="">
          </div>
          <div class="slide1_img3 animated flip">
            <img src="../assets/home/slide1_3.jpg" alt="">
          </div>
        </div>
        <div class="flower_wrap">
          <div class="flower" v-for="index in flowerNum" :key="index" :class="'flower_' + index"></div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <canvas id="love"></canvas>
        <div class="love"></div>
      </swiper-slide>
      <swiper-slide class="swiper-item">Slide 3</swiper-slide>
      <swiper-slide class="swiper-item">Slide 4</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Pool, Point, Love, canvasOption } from '../class'

export default {
  name: 'home',
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 1,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      setting: {
        canvas: {},
        context: {},
        particles: {},
        particleRate: {},
        time: 0
      },
      flowerNum: 90
    }
  },
  mounted () {
    this.updateAnimate()
    this.createPoint()
    let Loveq = new Love()
    // this.createPool()
    // let c = document.getElementById('love')
    // this.createCanvas(c)
    /*
  * Settings
  */
    var settings = {
      particles: {
        length: 500, // maximum amount of particles
        duration: 2, // particle duration in sec
        velocity: 100, // particle velocity in pixels/sec
        effect: -0.75, // play with this for a nice effect
        size: 30, // particle size in pixels
      },
    };


    /*
     * ParticlePool class
     */
    var ParticlePool = (function () {
      var particles,
        firstActive = 0,
        firstFree = 0,
        duration = settings.particles.duration;

      function ParticlePool(length) {
        // create and populate particle pool
        particles = new Array(length);
        for (var i = 0; i < particles.length; i++)
          particles[i] = new Loveq()
      }

      ParticlePool.prototype.add = function (x, y, dx, dy) {
        particles[firstFree].initialize(x, y, dx, dy);

        // handle circular queue
        firstFree++;
        if (firstFree == particles.length) firstFree = 0;
        if (firstActive == firstFree) firstActive++;
        if (firstActive == particles.length) firstActive = 0;
      };
      ParticlePool.prototype.update = function (deltaTime) {
        var i;

        // update active particles
        if (firstActive < firstFree) {
          for (i = firstActive; i < firstFree; i++)
            particles[i].update(deltaTime);
        }
        if (firstFree < firstActive) {
          for (i = firstActive; i < particles.length; i++)
            particles[i].update(deltaTime);
          for (i = 0; i < firstFree; i++)
            particles[i].update(deltaTime);
        }

        // remove inactive particles
        while (particles[firstActive].age >= duration && firstActive != firstFree) {
          firstActive++;
          if (firstActive == particles.length) firstActive = 0;
        }


      };
      ParticlePool.prototype.draw = function (context, image) {
        // draw active particles
        var i
        if (firstActive < firstFree) {
          for (i = firstActive; i < firstFree; i++)
            particles[i].draw(context, image);
        }
        if (firstFree < firstActive) {
          for (i = firstActive; i < particles.length; i++)
            particles[i].draw(context, image);
          for (i = 0; i < firstFree; i++)
            particles[i].draw(context, image);
        }
      };
      return ParticlePool;
    })();

    /*
     * Putting it all together
     */
    (function (canvas) {
      var context = canvas.getContext('2d'),
        particles = new ParticlePool(settings.particles.length),
        particleRate = settings.particles.length / settings.particles.duration, // particles/sec
        time;

      // get point on heart with -PI <= t <= PI
      function pointOnHeart(t) {
        return new Point(
          140 * Math.pow(Math.sin(t), 3),
          110 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
        );
      }

      // creating the particle image using a dummy canvas
      var image = (function () {
        var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');
        canvas.width = settings.particles.size;
        canvas.height = settings.particles.size;

        // helper function to create the path
        function to(t) {
          var point = pointOnHeart(t);
          point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350;
          point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350;
          return point;
        }

        // create the path
        context.beginPath();
        var t = -Math.PI;
        var point = to(t);
        context.moveTo(point.x, point.y);
        while (t < Math.PI) {
          t += 0.01; // baby steps!
          point = to(t);
          context.lineTo(point.x, point.y);
        }
        context.closePath();
        // create the fill
        context.fillStyle = '#ea80b0';
        context.fill();
        // create the image
        var image = new Image();
        image.src = canvas.toDataURL();
        return image;
      })();

      // render that thing!
      function render() {
        // next animation frame
        requestAnimationFrame(render);

        // update time
        var newTime = new Date().getTime() / 1000,
          deltaTime = newTime - (time || newTime);
        time = newTime;

        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // create new particles
        var amount = particleRate * deltaTime;
        for (var i = 0; i < amount; i++) {
          var pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
          var dir = pos.clone().length(settings.particles.velocity);
          particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
        }

        // update and draw particles
        particles.update(deltaTime);
        particles.draw(context, image);
      }

      // handle (re-)sizing of the canvas
      function onResize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }

      window.onresize = onResize;

      // delay rendering bootstrap
      setTimeout(function () {
        onResize();
        render();
      }, 10);
    })(document.getElementById('love'));
  },
  methods: {
    updateAnimate () {
      let b = 0
      let c = ['ms', 'moz', 'webkit', 'o']
      for (let a = 0; a < c.length && !window.requestAnimationFrame; a++) {
        window.requestAnimationFrame = window[c[a] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[c[a] + 'CancelAnimationFrame'] || window[c[a] + 'CancelRequestAnimationFrame']
      }
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (h) {
          let d = new Date().getTime()
          let f = Math.max(0, 16 - (d - b))
          let g = window.setTimeout(() => {
            h(d + f)
          }, f)
          b = d + f
          return g
        }
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (d) {
          clearTimeout(d)
        }
      }
    },
    createPoint () {
      const point = new Point()
      return point
    },

    createLove () {
      const love = new Love()
      return love.constructor
    },
    createPool () {
      const pool = new Pool()
      return pool
    },
    createCanvas (canvas_a) {
      console.log(canvasOption)
      this.setting.canvas = canvas_a
      this.setting.context = this.setting.canvas.getContext('2d')
      this.setting.particles = new Pool(canvasOption.love.length)
      this.setting.particleRate = canvasOption.love.length / canvasOption.love.duration
      window.onresize = this._onResize(this.setting.canvas)

      setTimeout(() => {
        this._onResize(this.setting.canvas)
        this.render()
      }, 10)
    },

    _pointOnHeart (t) {
      return new Point(
        160 * Math.pow(Math.sin(t), 3),
        130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
      )
    },

    _to (t) {
      let point = this._pointOnHeart(t)
      point.x = canvasOption.love.size / 2 + point.x * canvasOption.love.size / 350
      point.y = canvasOption.love.size / 2 - point.y * canvasOption.love.size / 350
      return point
    },
    _image () {
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      canvas.width = canvasOption.love.size
      canvas.height = canvasOption.love.size
      // console.log(context, '&&&&&&&&&&&&&&&&&&')
      context.beginPath()
      let t = -Math.PI
      let point = this._to(t)
      context.moveTo(point.x, point.y)
      while (t < Math.PI) {
        t += 0.01
        point = this._to(t)
        context.lineTo(point.x, point.y)
      }
      context.closePath()
      context.fillStyle = '#ea80b0'
      context.fill()
      let image = new Image()
      image.src = canvas.toDataURL()
      return image
    },
    render () {
      requestAnimationFrame(this.render)
      let newTime = new Date().getTime() / 1000
      let deltaTime = newTime - (this.setting.time || newTime)
      this.setting.time = newTime

      // 清除canvas
      // console.log(this.setting.context)
      this.setting.context.clearRect(0, 0, this.setting.canvas.width, this.setting.canvas.height)

      // 创建新的爱心
      let amount = this.setting.particleRate * deltaTime
      for (let i = 0; i < amount; i++) {
        // console.log(Math.PI - 2 * Math.PI * Math.random())
        let pos = this._pointOnHeart(Math.PI - 2 * Math.PI * Math.random())
        let dir = pos.clone().length(canvasOption.love.velocity)
        this.setting.particles.add(this.setting.canvas.width / 2 + pos.x, this.setting.canvas.height / 2 - pos.y, dir.x, -dir.y)
      }

      this.setting.particles.update(deltaTime)
      this.setting.particles.draw(this.setting.context, this._image())
    },
    _onResize (canvas) {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="less">
  @import "../style/home";
</style>
